import { } from 'dotenv/config';

import { dbInit } from './db';
import { apiInit } from './api';

const main = async () => {
  await dbInit();
  await apiInit();
};

main();
