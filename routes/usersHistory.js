var express = require('express');
var router = express.Router();
const { user_game, user_game_biodata, user_game_history } = require('../models');
const { get } = require('.');


router.get('/', async (req, res) =>{
	const user = await user_game.findAll({
		include: [{model: user_game_history, as: 'user_history'}]
	});
	res.render('editHistory.ejs', {user});
});

router.get('/views', async (req, res) =>{
    const user = await user_game.findAll({
        include: [{model: user_game_history, as: 'user_history'}]
    })
    res.render('viewHistory.ejs', {user})
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

  router.get("/game-history", async (req, res) => {
	const getGamerHistory = await user_game_history.findAll({
	  include: [{ model: user_game, as: "user_history" }],
	});
	res.status(200).json({
	  data: getGamerHistory
	});
  });

module.exports = router;


