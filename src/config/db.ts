import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger/logger.js';

export const db = new PrismaClient({
  omit: {},
});

export async function connectToDB() {
  try {
    await db.$connect();
    logger.info('[database]: connected!');
  } catch (err) {
    console.log('[database]: connection error: ', err);
    await db.$disconnect();
  }
}
