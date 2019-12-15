var UserSql = {
    insertNewUser: 'INSERT INTO User(username, password) VALUES(?,?) ',
    queryByName: 'SELECT * FROM user WHERE username = ?',
    queryByNameAndPwd: 'SELECT * FROM user WHERE username = ? AND password = ?',
    getUserById: 'SELECT * FROM user WHERE uid = ? '
};

module.exports = UserSql;