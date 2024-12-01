import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { multistream } from 'pino';
import fs from 'fs';
import path from 'path';

const prettyStream = pinoPretty({
    levelFirst: true,
    colorize: true,
    translateTime: 'SYS:standard',
});

const logPath = process.env.LOG_PATH || path.resolve('./log');

const consoleStream = { stream: prettyStream };

if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true });
}

const logFilePath = path.join(logPath, 'mqttlog.log');

const fileStream = { stream: fs.createWriteStream(logFilePath, { flags: 'a' }) };

const streams = [
    consoleStream,
    fileStream,
];


export const logger = pino({
    level: 'debug',
}, multistream(streams));
