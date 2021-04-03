import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/error';
import exampleRoutes from './routes/exampleRoutes';

const main = async () => {
  const app = express();
  app.use(cors());
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(errorHandler);
  app.use(express.json());
  app.use(morgan('dev'));
  app.disable('x-powered-by');
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }));

  const PORT = process.env.PORT || 5000;

  app.get('/', (_, res) => {
    res
      .status(200)
      .json({ msg: 'Simple Express, Typescript & Node starter ⚡️' });
  });

  app.use('/api/example', exampleRoutes);

  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (e) {
    console.error(e);
  }
};
main().catch((e) => {
  console.error(e);
});
