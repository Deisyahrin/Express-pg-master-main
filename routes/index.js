var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const user = await user_game.findAll({
    include : [{model: user_game_biodata, as: 'user_biodata'}]
  })
  res.render('Login', {user});
});

module.exports = router;
