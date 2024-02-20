// # LOG
// LOG_FORMAT = combined
// LOG_DIR = ../logs

export const { NODE_ENV, PORT, ORIGIN } = process.env;

export const LOG_FORMAT = process.env.LOG_FORMAT || 'combined';

export const LOG_DIR = process.env.LOG_DIR || '../logs';