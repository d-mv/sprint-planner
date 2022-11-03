import { env } from './tools';

export const CONFIG = {
  mongoDb: env('REACT_APP_MONGODB_URL').value ?? '',
  backend: env('REACT_APP_BACKEND').expect(),
};
