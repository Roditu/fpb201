var mysql = require('mysql2');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'digibase'

});

conn.connect((err) => {
    if(err) throw err;
    else console.log('SQL Connected');
});

module.exports = conn;