import mysqlPromise from 'mysql-promise';

const mysql = mysqlPromise();

mysql.configure({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_shop',
});

export default mysql;
