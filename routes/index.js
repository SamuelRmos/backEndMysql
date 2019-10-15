'use strict'

const express = require('express');
const router = express.Router();
const db = require('../sequelizeConnection');
const User = db.user;
const Consulta = db.consulta;
const fun = require('../encoded/encrypted');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads'});


///////////////// Registro Usuario ////////////////////////

router.post('/register', (req, resp, next) => {
 
        const postData = req.body;
        const plaintPassword = postData.password;
        //const hasData = fun.saltHashPassword(plaintPassword)

       // const password = hasData.passwordHash
        const name = postData.name
        const email = postData.email
        const foto = postData.foto
       
        User.findOne({
            where:{
                email: email,
                name: name,
            }
        })
        .then(user => {
            if(user)
            {
                resp.json('Email or Username already exist!');
                console.log('Email or Username user already exist!');
            }
            else
            {
                User.create({
                    email: email,
                    password: plaintPassword,
                    name: name,
                    genero: postData.genero,
                    nascimento: postData.nascimento,
                    foto: foto,
                    //salt: hasData.salt 
                })
                .then((user) => {
                    if(user)
                    {
                        resp.json('Success')
                        console.log('Success!')
                    }
                    else
                    {
                        resp.json('Error')
                    }
                });
            }
        });
       
});


///////////////// Confirmar Name e Email disponível ////////////////////////

router.post('/confirm', (req, resp, next) => {
 
    const postData = req.body;
    const name = postData.name;
    const email = postData.email;
   
    User.findOne({
        where:{
            email: email,
        }
    })
    .then(user => {
        if(user)
        {
            resp.json('Email or Username already exist!');
            console.log('Email or Username user already exist!');
        }
        else
        {
            User.findOne({
                where:{
                    name: name,
                }
            })
            .then(user => {
                if(user)
                {
                    resp.json('Email or Username already exist!');
                    console.log('Email or Username user already exist!');
                }
                else
                {
                    resp.json("Success");
                    console.log("Success");
                }
            });
        }
    });
   
});

 ///////////////////////// Login Usuario ///////////////////////////

router.post('/login', (req,resp, next) => {

    const postData = req.body;
    const name = postData.email;
    const password = postData.password;

    User.findOne({
        where:{
            name: name,
            password: password 
            }
        })
        .then(user => {
            
            // salt = user.salt;
           // const hashedPassword = fun.checkHashPassword(password, salt).passwordHash
            //const encryptedPassword = user.password

            if(user)
            {
              const obj = JSON.stringify(user)
              const jn = JSON.parse(obj)
              resp.json(jn)

                // resp.json("Success")
                   console.log(jn)
            }
            else
            {
                const obj = JSON.stringify("Error")
                const jn = JSON.parse(obj)
                resp.json(jn)
                console.log(jn)
            }
        })
    });
 //////////////////////////// Busca consulta ///////////////////

    router.post('/busca',(req,res,next) => {
      const postData = req.body;
      const nomepaciente = postData.nomepaciente;
      
            Consulta.findAll({
              where:{
               nomepaciente:nomepaciente
              }       
            })
            .then((consulta) => {
                if(consulta)
                {
                    const obj = JSON.stringify(consulta)
                    const jn = JSON.parse(obj)
                    res.json(jn)

                    console.log('Dados: ' , JSON.stringify(consulta))
                }
                else
                {
                    res.json('Error na busca')
                }
            });
    });

    ////////////// Registrar consulta  ////////////////

    router.post('/consulta',(req,res,next) => {
      const postData = req.body;
      const nomepaciente = postData.nomepaciente;
      const especialidade = postData.especialidade;
      const data = postData.data;
      const horario = postData.horario;
      const clinica = postData.clinica;
      const peso = postData.peso;
      const altura = postData.altura;
      const medicamentos = postData.medicamentos;
      
            Consulta.create({
                nomepaciente: nomepaciente,
                especialidade: especialidade,
                horario: horario,
                data: data,
                clinica: clinica,
                peso: peso,
                altura: altura,
                medicamentos: medicamentos
            })
            .then((consulta) => {
                if(consulta)
                {
                    res.json('Resgistration consult success!')
                    console.log('Resgistration consult success!')
                }
                else
                {
                    resp.json('Resgistration not success')
                }
            });
    });

    ////////////////////////////// Tratamento da imagem /////////////////////

    router.post('/uploadImage', upload.single('image'), function (req, res, next) {

        var tmp_path = req.file.path;
    
        var target_path = 'uploads/' + req.file.originalname;
    
        /** A better way to copy the uploaded file. **/
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', () => { res.json('complete'); console.log('complete') });
        src.on('error', (err) => { console.log('error'); });
        fs.unlink(tmp_path, err => {if(err) console.log(err)});
    });

    router.get('/image/:path', function (req, res) {
        var path_image = req.params.path;
        var src = fs.createReadStream('../bin/uploads/' + path_image);
        src.on('open', function () {
            src.pipe(res);
            console.log('down completed: ' + path_image);
        });
        src.on('error', function (err) {
            console.error('' + err);
        });
    });

    module.exports = router;



 
