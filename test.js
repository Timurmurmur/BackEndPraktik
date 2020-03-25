const bCrypt = require('bcrypt')

const salt = bCrypt.genSaltSync(10)

console.log(bCrypt.hashSync('test3', salt))