import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

dotenv.config();
//const __dirname = path.resolve();
//dotenv.config({path: 'D:\\applications\\shopping\\gjshopping\\backend\\.env'})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
  {
    console.log('connected to db');
  })
  .catch((err) =>
  {
    console.log(err.message);
  });

const app = express();
const corsOptions = {origin: true,credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) =>
{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/test',(req, res) =>
{
  res.send('success');
});

app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

// app.use(express.static('D:\\applications\\shopping\\gjshopping\\front\\build'));
// app.get('*', (req, res) =>
//   res.sendFile(`D:\\applications\\shopping\\gjshopping\\front\\index.html`)
// );

// app.use((err, req, res, next) =>
// {
//   res.status(500).send({ message: err.message });
// });

const port = 5000;
app.listen(port, () =>
{
  console.log(`serve at http://localhost:${port}`);
});
