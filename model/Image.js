const User = require('./User')

module.exports = (connection, Sequelize) => {

    const Image = connection.define('images', {

        id:{
            type: Sequelize.INTEGER,
            references:{
                model: User,
                key: 'id'
            },
            primaryKey: true  
          },

       data: {
           type: Sequelize.BLOB('long')
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

    return Image;
}