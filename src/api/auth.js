/* eslint-disable import/prefer-default-export */

import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import { User } from '../db';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy({ passReqToCallback: true },
  (async (req, username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) {
      done(null, false, { message: 'Invalid username' });
    } else if (!user.validPassword(password)) {
      done(null, false, { message: 'Invalid password' });
    } else {
      done(null, user);
    }
  })));

export const initializeAuth = () => passport.initialize();

export const authenticateLocal = (callback) => passport.authenticate('local', {
  // successRedirect: '/good',
  // failureRedirect: '/bad',
  failureFlash: true,
  // failureMessage: true,
}, callback);
