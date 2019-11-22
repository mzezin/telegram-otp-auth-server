import Router from 'koa-router';
// import jwt from 'jsonwebtoken';
// import passport from 'koa-passport';

import { User } from '../db';
import { sendOTP } from '../telegram';

import { authenticateLocal } from './auth';


// const jwtsecret = 'mysecretkey';

const router = new Router();


router.post('/register', async (ctx) => {
  try {
    const user = new User(ctx.request.body);
    ctx.body = await user.save();
  } catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/createOTP', async (ctx) => {
  try {
    const { userId } = ctx.request.body;
    await sendOTP(userId);
    ctx.body = { message: 'OTP have been send' };
  } catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});


router.post('/login', async (ctx) => authenticateLocal(async (err, user, info) => {
  if (err) {
    ctx.status = 500;
    ctx.body = err;
  } else
  if (user) {
    console.log(ctx.request.body.otp);
    const { id } = user;
    await sendOTP(id);
    ctx.redirect('/submitOTP');
  } else {
    ctx.status = 401;
    ctx.body = info;
  }
})(ctx));


router.get('/submitOTP', (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.flash();
});

router.get('/bad', (ctx) => {
  // console.log(ctx.req.flash);
  ctx.status = 401;
  [ctx.body] = ctx.flash('error');
});


// router.post('/login', async (ctx, next) => {
//   await passport.authenticate('local', (err, user) => {
//     if (user === false) {
//       ctx.body = 'Login failed';
//     } else {
//       // --payload - информация которую мы храним в токене и можем из него получать
//       const payload = {
//         id: user.id,
//         displayName: user.displayName,
//         username: user.userename,
//       };
//       const token = jwt.sign(payload, jwtsecret); // здесь создается JWT

//       ctx.body = { user: user.displayName, token: `JWT ${token}` };
//     }
//   })(ctx, next);
// });

// router.get('/custom', async (ctx, next) => {
//   await passport.authenticate('jwt', (err, user) => {
//     if (user) {
//       ctx.body = `hello ${user.displayName}`;
//     } else {
//       ctx.body = 'No such user';
//       console.log('err', err);
//     }
//   })(ctx, next);
// });


const routes = () => router.routes();

export default routes;
