var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'ours',
});
connection.connect();

function User(user) {
	this.username = username;
	this.password = password;
}
/*根据用户名查询获取用户信息*/
User.getUserByUsername = function(username, callback) {
	console.log(username);
	var selectSql = "select * from t_user where username = ?";
	connection.query(selectSql, [username], function(err, result) {
		if(err) {
			console.log("getUserByUsername err --> " + err);
			return;
		}
		callback(err, result);
	});
};
//connection.end();

module.exports = User;


