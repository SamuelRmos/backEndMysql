const Image = require('./Image')

module.exports = (connection, Sequelize) =>{

    const User = connection.define('users', {
      
        id:{
          type: Sequelize.INTEGER, 
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
          references: {
            model: Image,
            key: 'id'
          } 
        },
        email:{
            type: Sequelize.TEXT,
            field: 'email',
        },
        password:{
            type: Sequelize.TEXT,
            field: 'password',
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
        },
        genero: {
          type: Sequelize.STRING,
          field: 'genero',
        },
        nascimento: {
            type: Sequelize.STRING,
            field: 'nascimento',
          },
          salt: {
            type: Sequelize.TEXT,
            field: 'salt',
          },
          foto: {
            type: Sequelize.BLOB,
            field: 'foto',
          },
        created_at: {
            field: 'created_at',
            type: Sequelize.DATE
        },
        // updated_at: {
        //     field:'updated_at',
        //     type: Sequelize.DATE
        // }     
        });
    
        return User;
    }