'use strict'

const app = require('./app')
const db = require('./sequelizeConnection')
const User = db.user
//const Image = db.images
const fun = require('./encoded/encrypted')
const http = require('http')
const ip = require('ip')
const debug = require('debug')

const port = normalizePort(process.env.PORT || '3003');
app.set('port', port);

const server = http.createServer(app);

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


function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

      function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
        debug('Listening on ' + bind);
      }

 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening); 
console.log('Server run port: ' + port);    