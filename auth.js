const passport = require('koa-passport');
const db = require("./modules/mysql");
const passwd = require("./modules/password");

const fetchUser = async (key, param) =>{
	let user = (await db.query(
		`SELECT * FROM users WHERE ${key} = ?`,
		[param]
	))[0][0];
	return user;
}

const fetchUserByPhone = async (id) => {
	return await fetchUser("phone", id);
}

const fetchUserById = async (id) => {
	return await fetchUser("id", id);
}

const fetchUserByVk = async (id) => {
	return await fetchUser("vk_token", id);
}

passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUserById(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
    usernameField: 'phone',
    passwordField: 'password'
  },
	async function(username, password, done) {
		let user = await fetchUserByPhone(username);
		if (!user) done(null, false);
		if (
			username === user.phone && 
			(await passwd.comparePassword(password, user.password))
		) {
			done(null, user);
		} else {
			done(null, false);
		}
}));

const VkStrategy = require('passport-vkontakte').Strategy;
passport.use(new VkStrategy(
	{
		clientID:     "7291565", // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: "fQvxl3hMTQ48nZeEA4nl",
    callbackURL:  "http://localhost:3000/api/v1/auth/vk/callback"
	},
	async function(accessToken, refreshToken, params, profile, done) {
		try {
			let user = await fetchUserByVk(profile.id);
			if (user) {
				done(null, user);
			} else {
				let newUserId = (await db.query(
					"INSERT INTO `users` (`vk_token`) VALUES (?)",
					[profile.id]
					))[0].insertId;
				done(null, {id: newUserId, vk_token: profile.id});
			}
		} catch (error) {
			console.log(error);
			done(error);
		}
	}
));