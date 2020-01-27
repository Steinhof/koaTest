const mysql = require('mysql-promise')();

mysql.configure({
	host:	'localhost',
	user: 'root',
	password: 'root',
	database: 'test_shop',
});

module.exports = mysql;
