const KoaRouter = require('koa-router');
const router = new KoaRouter();
const passport = require('koa-passport');
const amazon = require('../modules/amazon');

const shopController = require('../controllers/shop');
const authController = require('../controllers/auth');

router
	.get(
		"/api/v1/shop/:shopId/buy/:productId", 
		authController.checkAuth, 
		shopController.buyProduct
	)

	.get(
		"/api/v1/shop/:id", 
		authController.checkAuth, 
		shopController.shopInfo
	)

	.post(
		"/api/v1/shop/create", 
		authController.checkAuth, 
		shopController.createShop
	)
	
	.get("/", ctx => {ctx.body = "Home"})
	.get("/error", ctx => {ctx.body = "Error"})
	
	.post(
		"/api/v1/auth/register",
		authController.register
	)

	.post(
		"/api/v1/auth/login",
		passport.authenticate('local'),
		authController.login
	)

	.get("/api/v1/auth/vk", passport.authenticate('vkontakte'))
	.get(
		"/api/v1/auth/vk/callback", 
		passport.authenticate('vkontakte'), 
		ctx => {ctx.body = {status: "OK"}}
	)

	.post(
		"/api/v1/auth/logout",
		function (ctx) {
			ctx.logout();
			ctx.body = {status: "OK"}
		}
	);

module.exports = router;