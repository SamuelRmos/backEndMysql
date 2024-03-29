
module.exports = (connection, Sequelize) =>{

    const User = connection.define('users', {
      
        id:{
          type: Sequelize.INTEGER, 
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
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
          foto: {
            type: Sequelize.TEXT,
            field: 'foto',
          },
        created_at: {
            field: 'created_at',
            type: Sequelize.DATE
        },  
      });
    
        return User;
    }