'use strict';

const Sequelize = require('sequelize')
const properties = require('./properties.json');
const username = properties.mysql.user
const password = properties.mysql.password
const database = properties.mysql.database
const host = properties.mysql.host

const sequelize = new Sequelize({database,username,password,host,
   port:properties.mysql.port || 3308,
    dialect:'mysql',
    define: {
        timestamps: false
    },
   // timezone: 'Etc/GMT0' //for writing to database
});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established'))
    .catch(err => console.error('unable to connect to the database:', err));
    
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./model/User')(sequelize,Sequelize);
db.consulta = require('./model/Consulta')(sequelize, Sequelize);

module.exports = db;