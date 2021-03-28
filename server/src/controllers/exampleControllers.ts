import 'dotenv/config';
import { Response } from 'express';

const example = (_: any, res: Response) => res.status(200).json({ msg: 'Hello from example controller 👋' });
export { example };
