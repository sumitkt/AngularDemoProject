var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('demoproject_db', 'root', 'sumit',{
host: 'localhost',
dialect:'mariadb',
port:'3306'
});



auto.run(function (err) {
if (err) throw err;



console.log(auto.tables); // table list
console.log(auto.foreignKeys); // foreign key list
});