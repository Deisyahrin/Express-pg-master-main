const { user_game } = require('./models')

user_game.create({
    username: 'ricky',
    password: 'ariansyah',
    email: 'admin',
    generate_random: "random_string"
   })
    .then(result => {
      console.log(result)
})

