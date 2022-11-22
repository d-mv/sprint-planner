import { connect } from 'mongoose';
import { R, colorette, logger, getMessageFromError } from '@mv-d/toolbelt';

export async function connectDb(url: string) {
  try {
    await connect(url);

    R.compose(logger.log, colorette.blue)('DB is connected');
  } catch (err) {
    throw new Error(getMessageFromError(err) ?? 'Unknown error when connecting to DB');
  }
}
