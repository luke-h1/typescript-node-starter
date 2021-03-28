import express from 'express';
import { example } from '../controllers/exampleControllers';

const router = express.Router();

router.route('/').get(example);

export default router;
