const bcrypt = require('bcrypt');

exports.hashPassword = function (rawPassword) {
	return new Promise(function(resolve, reject) {
		bcrypt.genSalt(11, function(err, salt) {
			if (err) reject(err);
			bcrypt.hash(rawPassword, salt, function(err, hash) {
				if (err) reject(err);
				resolve(hash);
			})
		})
	});
}

exports.comparePassword = function(rawPassword, hashword) {
	return new Promise(function(resolve, reject) {
		bcrypt.compare(rawPassword, hashword, function(err, isPasswordMatch) {   
			if (err) reject(err);
			resolve(isPasswordMatch);
		});
	});
}
