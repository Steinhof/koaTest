import { hashPassword } from '../modules/password';

export const checkAuth = async function(ctx, next) {
    if (!ctx.isAuthenticated()) {
        ctx.status = 401;
        ctx.body = {
            error: 'Permission denied!',
        };
        return;
    }
    await next();
};

export const register = async ctx => {
    if (!ctx.request.body.phone || !ctx.request.body.password) {
        ctx.status = 400;
        ctx.body = {
            status: 'ERROR',
            message: 'Invalid credentials',
        };
        return;
    }

    ctx.request.body.phone = ctx.request.body.phone.trim();
    ctx.request.body.password = ctx.request.body.password.trim();

    try {
        ctx.request.body.password = await hashPassword(
            ctx.request.body.password,
        );

        await ctx.db.query(
            'INSERT INTO users (`phone`, `password`) VALUES (?, ?)',
            [ctx.request.body.phone, ctx.request.body.password],
        );

        ctx.body = { status: 'OK' };
    } catch (error) {
        if (error.errno === 1062) {
            ctx.status = 500;
            ctx.body = {
                status: 'ERROR',
                message: 'This phone already registered!',
            };
            return;
        }

        console.log(error);
        ctx.status = 500;
        ctx.body = {
            status: 'ERROR',
            message: 'Error when registering!',
        };
    }
};

export const login = async (ctx, next) => {
    ctx.body = { status: 'OK' };
};
