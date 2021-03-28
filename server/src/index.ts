import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { errorHandler } from './middleware/error';
import exampleRoutes from './routes/exampleRoutes';

const main = async () => {
  const API_URL = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : process.env.PROD_URL;
  const app = express();
  app.use(cors());
  app.set('trust-proxy', 1);
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 80, // limit each IP addr to 80 requests per 15 mins
    message: 'Too many requests from this IP. Try again in 15 minutes',
  });
  app.use(helmet());
  app.use(limiter);
  app.use(errorHandler);
  app.use(express.json());
  app.use(morgan('dev'));
  app.disable('x-powered-by');
  const PORT = process.env.PORT || 5000;

  app.get('/', (_, res) => {
    res
      .status(200)
      .json({ msg: 'Simple Express, Typescript & Node starter ⚡️' });
  });

  app.use('/api/example', exampleRoutes);

  try {
    app.listen(PORT, () => {
      console.log(`Server running on ${API_URL} in ${process.env.NODE_ENV} mode`);
    });
  } catch (e) {
    console.error(e);
  }
};
main().catch((e) => {
  console.error(e);
});
