var express = require('express');
const { get } = require('.');
const {user_game, user_game_biodata, user_game_history} = require('../models');
var router = express.Router();


router.get('/', async (req, res) =>{
    const user = await user_game.findAll({
        include: [{model: user_game_biodata, as: 'user_biodata'}]
    })
    res.render('editBiodata', {user})
})

router.get('/views', async (req, res) =>{
    const user = await user_game.findAll({
        include: [{model: user_game_biodata, as: 'user_biodata'}]
    })
    res.render('editUser', {user})
})

   //Barisan koding ini untuk menghilangkan data user yang sudah ada di database
   router.delete('/:id', async(req, res) => {
    const deleteUser = await user_game.destroy({where : {id: req.params.id}});
  
    //Bagian if ini ada untuk mencegah penghapusan data yang sudah dihapus atau memang tidak ada
    if(!deleteUser){
      return res.status(400).json({message: 'Data user yang akan dihapus tidak ada'});
    }
    return res.status(201).json({code: 201, message: 'Data telah berhasil dihapus'});
  })

router.get('/users-biodata/views/:id', async (req, res) => {
    const usersGamer = await user_game.findOne({ where: {id :req.params.id}})
    res.render('viewBiodata', {title: 'User-gamer', usersGamer})
})


//Barisan koding ini digunakan untuk menampilkan halaman biodataUser.ejs
  //Halaman ini digunakan untuk tampil muka dalam mengganti biodata salah satu user di database
  router.get('/:id', async(req, res) => { 
    res.render('editBiodata');
    const updateUser = await user_game.findOne({where : {id: req.params.id}});
  })
  
module.exports = router;