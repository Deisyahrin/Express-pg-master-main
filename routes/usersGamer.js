var express = require('express');
var router = express.Router();
const { user_game, user_game_biodata, user_game_history } = require('../models');
const { get } = require('.');


router.get('/', async (req, res) =>{
	const user = await user_game.findAll({
		include: [{model: user_game, as: 'user_game'}]
	});
	res.render('addUserGamer.ejs', {user});
});

router.get('/views', async (req, res) =>{
    const user = await user_game.findAll({
        include: [{model: user_game_history, as: 'user_game'}]
    })
    res.render('addUserGamer.ejs', {user})
})


module.exports = router;


