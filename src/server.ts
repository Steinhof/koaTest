/* Import environment variables */
import { config } from 'dotenv';

config({ path: `${__dirname}/.env` });

import('./app');
