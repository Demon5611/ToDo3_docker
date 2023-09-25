/* eslint-disable no-undef */
import express from 'express';
import session from 'express-session';
import path from 'path';
import store from 'session-file-store';
import isAuth from './middlewares/isAuth';
import resLocals from './middlewares/resLocals';
import apiAuthRouter from './routes/apiAuthRouter';
import renderRouter from './routes/renderRouter';
import toDoListRouter from './routes/toDoListRouter';

import jsxRender from './utils/jsxRender';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.engine('js', jsxRender);
app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(resLocals);

app.use('/', renderRouter);

app.use('/todolist', isAuth, toDoListRouter);

app.use('/api/auth', apiAuthRouter);



app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
