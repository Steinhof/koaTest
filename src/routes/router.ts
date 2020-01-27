import KoaRouter from 'koa-router';
import { authenticate } from 'koa-passport';
import { buyProduct, createShop, shopInfo } from '../controllers/shop';
import { checkAuth, login, register } from '../controllers/auth';

const router = new KoaRouter();

router
    .get('/', ctx => {
        ctx.body = 'Home';
    })

    .get('/error', ctx => {
        ctx.body = 'Error';
    })

    .get('/api/v1/shop/:id', checkAuth, shopInfo)

    .get('/api/v1/shop/:shopId/buy/:productId', checkAuth, buyProduct)

    .post('/api/v1/shop/create', checkAuth, createShop)

    .post('/api/v1/auth/register', register)

    // .post('/api/v1/auth/login', authenticate('local'), login)

    // .get('/api/v1/auth/vk', authenticate('vkontakte'))

    // .get('/api/v1/auth/vk/callback', authenticate('vkontakte'), ctx => {
    //     ctx.body = { status: 'OK' };
    // })

    .post('/api/v1/auth/logout', ctx => {
        ctx.logout();
        ctx.body = { status: 'OK' };
    });

export default router;
