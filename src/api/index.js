/* eslint-disable no-unused-vars */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import flash from 'koa-better-flash';


// import passport from 'koa-passport';
// import { serializeUser, deserializeUser, use, initialize } from 'koa-passport';


import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';

import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import { initializeAuth, authenticateLocal } from './auth';

import routes from './routes';
import { User } from '../db';

export const dummy = null;

export const apiInit = async () => {
  const app = new Koa();


  app.use(logger());

  app.keys = ['foo'];
  app.use(session(app));
  app.use(flash());

  app.use(bodyParser());

  app.use(initializeAuth());

  app.use(routes());

  await app.listen(3000);
  console.log('API server listening');
};
