const Koa = require('koa');
const app = new Koa();

// Sessions
const session = require('koa-session')
app.keys = ['fWE#RfE8fe4greH3342']
app.use(session({}, app))
app.context.currentUser = null;

// Body parser
const bodyParser = require('koa-body');
app.use(bodyParser({
	formidable:{uploadDir: './uploads'},    //This is where the files would come
	multipart: true,
	urlencoded: true
}));

// CORS
const allowCrossDomain = 

app.use(async function(ctx, next) {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Methods', '*');
	ctx.set('Access-Control-Allow-Headers', '*');
	await next();
})

// Authentication
require('./auth')
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

// DB
app.context.db = require('./modules/mysql');

// Routes
const router = require('./routes/router');

app
	.use(router.routes())
	.use(router.allowedMethods());

// Server
const port = 3000;
app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});