'use strict'

const app = require('./app')
const db = require('./sequelizeConnection')
const User = db.user
//const Image = db.images
const fun = require('./encoded/encrypted')
const http = require('http')
const ip = require('ip')

const port = normalizePort(process.env.PORT || '3003');

app.get('/', (req, res, next) => {
    res.send('Hello World');
})

app.post('/register', (req, resp, next) => {
 
        const postData = req.body;
        const plaintPassword = postData.password;
        const hasData = fun.saltHashPassword(plaintPassword)

        const password = hasData.passwordHash
        const name = postData.name
        const email = postData.email
        const foto = postData.foto
       
        User.findOne({
            where:{
                email: email
            }
        })
        .then(user => {
            if(user)
            {
                resp.json('Email already exist!')
                console.log('Email already exist!')
            }
            else
            {
                User.create({
                    email: email,
                    password: password,
                    name: name,
                    genero: postData.genero,
                    nascimento: postData.nascimento,
                    foto: foto,
                    salt: hasData.salt 
                })
                .then((user) => {
                    if(user)
                    {
                        resp.json('Resgistration Success!')
                        console.log('Resgistration Success!')
                    }
                    else
                    {
                        resp.json('Resgistration not success')
                    }
                });

                // Image.create({
                //     foto: foto
                // })
                // .then((user) => {
                //     if(user)
                //     {
                //         resp.json('Image save')
                //         console.log('Image save')
                //     }
                //     else
                //     {
                //         resp.json('Image not save')
                //         console.log('Image not save')
                //     }
                // }) 
            }
        });
       
});

app.post('/login', (req,resp, next) => {

    const postData = req.body;
    const email = postData.email;
    const password = postData.password;

    User.findOne({
        where:{
            email: email 
            }
        })
        .then(user => {
            
            const salt = user.salt;
            const hashedPassword = fun.checkHashPassword(password, salt).passwordHash
            const encryptedPassword = user.password

            if(hashedPassword == encryptedPassword)
            {
                resp.json("Success")
                console.log('Login Success')
            }
            else
            {
                resp.json("Error")
                console.log('Email or Password incorrect')
            }
        })
    });

    function normalizePort(val) {
        let port = parseInt(val, 10);
      
        if (isNaN(port)) {
          // named pipe
          return val;
        }
      
        if (port >= 0) {
          // port number
          return port;
        }
      
        return false;
      }
      

app.listen(port, ip.address(), () => {
    console.log('Server run on port ' + port)
})