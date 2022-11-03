import axios from 'axios';

import { CONFIG } from '../config';
import { Result } from '../entities';

import { AnyValue } from '../models';

export async function query<T = AnyValue>(domain: string, action: string, payload?: AnyValue) {
  const r = await axios.post<Result<T>>(CONFIG.backend, { domain, action, payload });

  return r.data;
}
