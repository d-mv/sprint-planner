import { connect } from 'mongoose';
import { path } from 'ramda';
import colors from 'colors';

import { STATE } from '../../entities';

export async function connectDb(url: string) {
  try {
    await connect(url);

    STATE.isConnectedToDb = true;
    // eslint-disable-next-line no-console
    console.log(colors.blue('DB is connected'));
  } catch (err) {
    throw new Error(path(['message'], err) ?? 'Unknown error when connecting to DB');
  }
}
