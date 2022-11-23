import { connect } from 'mongoose';
import { logger, getMessageFromError } from '@mv-d/toolbelt';

export async function connectDb(url: string) {
  try {
    await connect(url);

    logger.infoB('DB is connected');
  } catch (err) {
    throw new Error(getMessageFromError(err) ?? 'Unknown error when connecting to DB');
  }
}
