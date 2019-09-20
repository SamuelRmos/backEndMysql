const User = require('./User')

module.exports = (connection, Sequelize) => {

    const Consulta = connection.define('consultas', {

        id:{
            type: Sequelize.INTEGER,
            references:{
                model: User,
                key: 'id'
            },
            primaryKey: true  
          },
          nome_consulta:{
            type: Sequelize.TEXT,
            field: 'nome_consulta',
        },
        horario:{
            type: Sequelize.TEXT,
            field: 'horario',
        },
        data:{
            type: Sequelize.TEXT,
            field: 'data',
        },
        clinica:{
            type: Sequelize.TEXT,
            field: 'clinica',
        },
       created_at: {
        field: 'created_at',
        type: Sequelize.DATE
    } 
    });

    // User.hasMany(Image, {
    //     as: 'images',
    //     foreignKey: 'id'
    // });

    // Image.belongsTo(User, {foreignKey:'id', constraints:true})

    return Consulta;
}