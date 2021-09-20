var express = require('express');
const { user_game, user_game_biodata, user_game_history } = require('./../models');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

/* GET users listing. */
//Barisan koding ini digunakan untuk menampilkan halaman addUser.ejs
//Halaman ini digunakan untuk tampil muka dalam menambah data user ke database
router.get('/', function(req, res){ 
    res.render('addUserGamer');
  })
  
  //Barisan koding ini digunakan untuk menampilkan halaman biodataUser.ejs
  //Halaman ini digunakan untuk tampil muka dalam mengganti biodata salah satu user di database
  router.get('/:id', async(req, res) => { 
    res.render('editBiodata');
    const updateUser = await user_game.findOne({where : {id: req.params.id}});
  })


router.post(
  '/',
  // username must be an email
  body('username').notEmpty().withMessage('username tidak boleh kosong'),
  body('email').isEmail().withMessage('tidak sesuai format email'),
  body('password')
  .notEmpty()
  .withMessage('password tidak boleh kosong')
  .isLength({ min: 8 })
  .withMessage('minimal 8 karakter'),
  // if(req.body.username == null || req.body.username == "" || req.body.username == undefined)
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    console.log(req)
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Bagian ini mencari apakah username atau email yang digunakan sudah ada di database atau belum
    const data = await user_game.findOne({where : {
        [Op.or]: [
          {username: req.body.username},
          {email: req.body.email}
        ]
      }
      });

    if (data) {
      return res.status(400).json({ message: 'username sudah ada' })
    }

    // logika random 
    // username + random angka

    // random 3 data
    let suggestRandom = []
    for (let i = 0; i < 3; i++) {
      let randomAngka = Math.floor(Math.random() * 3)
      suggestRandom.push(req.body.username + randomAngka.toString())
    }

    // hashing password
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      // Store hash in your password DB.

      user_game.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        generate_random: suggestRandom[0]
      })
      .then(result => {
        console.log(result.id)
          user_game_biodata.create({
          alamat: req.body.alamat,
          notelp: req.body.notelp,
          nama: req.body.nama,
          tanggal_lahir: req.body.tanggal_lahir,
          id_user_game: result.id


        })
        return res.status(201).json({code: 201, message: 'Data telah dimasukkan ke dalam database'})
        
      })
    });


    //Barisan koding ini untuk menghilangkan data user yang sudah ada di database
router.delete('/:id', async(req, res) => {
    const deleteUser = await user_game.destroy({where : {id: req.params.id}});
  
    //Bagian if ini ada untuk mencegah penghapusan data yang sudah dihapus atau memang tidak ada
    if(!deleteUser){
      return res.status(400).json({message: 'Data user yang akan dihapus tidak ada'});
    }
    return res.status(201).json({code: 201, message: 'Data telah berhasil dihapus'});
  })

  //Barisan koding ini untuk mengganti data user yang sudah ada di database
router.post('/:id', async(req, res) => {
    user_game_biodata.update({
      name: req.body.name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      date_of_birth: req.body.date_of_birth
    }, 
    //Bagian ini mencari id user yang biodatanya akan dirubah
    {
      where: {user_game_id : req.params.id}
    })
    .then(result => {
      res.status(201).json({'message' : 'Biodata telah berhasil diubah'});
    })
  })

    router.get("/", async (req, res) => {
      const getUserGame = await user_game.findAll();

      if (getUserGame) {
        res.status(200).json({
          status: 200,
          msg: "berhasil get all user game",
          data: getUserGame,
        });
      } else {
        res.status(400).json({
          status: 400,
          msg: "tidak ditemukan data",
        });
      }
    });

    router.get("/game-history", async (req, res) => {
      const getGamerHistory = await user_game_history.findAll({
        include: [{ model: user_game, as: "user_history" }],
      });
      res.status(200).json({
        data: getGamerHistory
      });
    });

    // return res.status(200).json({ message : 'data bisa dimasukkan', suggestUsername: suggestRandom})

  },
);

module.exports = router;