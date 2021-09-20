var express = require('express');
var router = express.Router();
const { user_game, user_game_biodata, user_game_history } = require('../models');
const { get } = require('.');


router.get('/', async (req, res) =>{
	const user = await user_game.findAll({
		include: [{model: user_game_biodata, as: 'user_biodata'}]
	});
	res.render('listUserGamer', {user});
});

router.get('/views', async (req, res) =>{
    const user = await user_game.findAll({
        include: [{model: user_game_biodata, as: 'user_biodata'}]
    })
    res.render('listUserGamer', {user})
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

module.exports = router;


