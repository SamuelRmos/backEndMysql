'use strict'

const express = require('express');
const router = express.Router();
const db = require('../sequelizeConnection');
const User = db.user;
const Consulta = db.consulta;
const fun = require('../encoded/encrypted');

///////////////// Registro ////////////////////////

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

 ///////////////////////// Login ///////////////////////////

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

    router.get('/busca',(req,res,next) => {
      const postData = req.body;
      const id = postData.id;
      
            Consulta.findAll({
              where:{
               id:id
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
      const id = postData.id;
      const nome_consulta = postData.nome_consulta;
      const horario = postData.horario;
      const data = postData.data;
      const clinica = postData.clinica;
      
            Consulta.create({
                id: id,
                nome_consulta: nome_consulta,
                horario: horario,
                data: data,
                clinica: clinica,
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

    module.exports = router;



 
