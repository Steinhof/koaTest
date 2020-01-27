import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as VkStrategy } from 'passport-vkontakte';
import db from './modules/mysql';
import { comparePassword } from './modules/password';

const fetchUser = async (key, param): Promise<void> => {
    return (
        await db.query(`SELECT * FROM users WHERE ${key} = ?`, [param])
    )[0][0];
};

const fetchUserByPhone = async (id): Promise<void> => {
    return fetchUser('phone', id);
};

const fetchUserById = async (id): Promise<void> => {
    return fetchUser('id', id);
};

const fetchUserByVk = async (id): Promise<void> => {
    return fetchUser('vk_token', id);
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await fetchUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'phone',
            passwordField: 'password',
        },
        async (username, password, done): Promise<void> => {
            const user = await fetchUserByPhone(username);
            if (!user) done(null, false);
            if (
                username === user.phone &&
                (await comparePassword(password, user.password))
            ) {
                done(null, user);
            } else {
                done(null, false);
            }
        },
    ),
);

passport.use(
    new VkStrategy(
        {
            clientID: process.env.APP_ID as string, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: `${process.env.SERVER_URL}/api/v1/auth/vk/callback`,
        },
        async (accessToken, refreshToken, params, profile, done) => {
            try {
                const user = await fetchUserByVk(profile.id);
                if (user) {
                    done(null, user);
                } else {
                    const newUserId = (
                        await db.query(
                            'INSERT INTO `users` (`vk_token`) VALUES (?)',
                            [profile.id],
                        )
                    )[0].insertId;
                    done(null, { id: newUserId, vk_token: profile.id });
                }
            } catch (error) {
                console.log(error);
                done(error);
            }
        },
    ),
);
