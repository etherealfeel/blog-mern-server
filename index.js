import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validations/validation.js';
import checkAuth from './utils/checkAuth.js';
import { register, login, getMe } from './controllers/UserController.js';

mongoose
  .connect('mongodb+srv://admin:admin@cluster0.oqurahn.mongodb.net/blog')
  .then(() => console.log('db is working'))
  .catch(() => console.log('error connecting db'));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, register);
app.post('/auth/login', loginValidation, login);
app.get('/auth/me', checkAuth, getMe);

app.listen(4000, (err) => {
  if (err) return console.log(err);
  console.log('server is oka');
});
