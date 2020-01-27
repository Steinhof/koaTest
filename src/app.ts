import Koa from 'koa';
import session from 'koa-session';
import bodyParser from 'koa-body';
import passport from 'koa-passport';
import router from './routes/router';
import logger from './config/logger';

const app = new Koa();

app.keys = ['fWE#RfE8fe4greH3342'];
app.use(session({}, app));
app.context.currentUser = null;
app.use(
    bodyParser({
        formidable: { uploadDir: './uploads' }, // This is where the files would come
        multipart: true,
        urlencoded: true,
    }),
);

// CORS
const allowCrossDomain = app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    await next();
});

// AUTHENTICATION
require('./auth');

app.use(passport.initialize());
app.use(passport.session());

// DB
app.context.db = require('./modules/mysql');

app.use(router.routes()).use(router.allowedMethods());

// SERVER
const PORT = parseInt(process.env.PORT as string, 10) || 80;

app.listen(PORT, () => {
    logger.info(`[SERVER]Server running at port ${PORT}`);
});
