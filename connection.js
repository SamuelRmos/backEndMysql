const mysql = require('mysql');
const properties = require('./properties.json');

const connection = mysql.createdPool({

  connectionLimit: properties.mysql.connectionLimit,
  host: properties.mysql.host,
  port: properties.mysql.port || 3308,
  user: properties.mysql.user,
  password: properties.mysql.password,
  database: properties.mysql.database

});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  if(err){
    console.log(err)
  }else{
    console.log(`mysql connected with ${properties.mysql.host}`);
    }  
})

pool.queryPromise = (options, values) => {
    
  return new Promise((resolve, reject) => {
    pool.query(options, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results, fields);
      }
    });
  });
};

module.exports = connection;