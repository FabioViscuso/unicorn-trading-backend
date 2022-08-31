const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

//parsing all req of content-type (app-json)
app.use(express.json())

//parsing all req with url-encoded
app.use(express.urlencoded({ extended: true }))

// first generic route
app.get('/', (req, res) => {
    res.json({ msg: 'all ok ' })
})

//routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)
require('./app/routes/product.routes')(app)
require('./app/routes/wishlist.routes')(app)

//set port & listen

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('server up & running')
})

// init my SQL

const db = require('./app/models')
const Role = db.role
const SeedUser = db.user

function init() {
    Role.create({
        id: 1,
        name: 'user'
    });
    Role.create({
        id: 2,
        name: 'moderator'
    });
    Role.create({
        id: 3,
        name: 'admin'
    })
    SeedUser.create({
        username: 'seedUsername',
        email: 'seed@mail.com',
        password: 'password123'
    })
}


db.sequelize.sync()
    .then(async () => {
        console.log('up')
        const isDbSeeded = await db.user.findOne()
        if (!isDbSeeded) {
            console.log('DB not seeded, initializing')
            init()
        }
    })
