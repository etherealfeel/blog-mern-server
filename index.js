import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {validationResult} from 'express-validator'

import { registerValidator } from './validations/auth.js';

mongoose
  .connect('mongodb+srv://admin:admin@cluster0.oqurahn.mongodb.net/')
  .then(() => console.log('db is working'))
  .catch(() => console.log('error connecting db'));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true
  })
});

app.listen(4000, (err) => {
  if (err) return console.log(err);
  console.log('server is oka');
});
