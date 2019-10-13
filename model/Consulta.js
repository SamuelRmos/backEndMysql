module.exports = (connection, Sequelize) => {

    const Consulta = connection.define('consultas', {

          idconsulta:{
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            field: 'idconsulta',
          },
          especialidade:{
            type: Sequelize.TEXT,
            field: 'especialidade',
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
          peso:{
            type: Sequelize.TEXT,
            field: 'peso',
           },
          altura:{
            type: Sequelize.TEXT,
            field: 'altura',
           },
          nomepaciente:{
            type: Sequelize.TEXT,
            field: 'nomepaciente',
           },
          medicamentos:{
            type: Sequelize.TEXT,
            field: 'medicamentos',
          },
          created_at: {
            field: 'created_at',
            type: Sequelize.DATE
         }, 
      });

    return Consulta;
}