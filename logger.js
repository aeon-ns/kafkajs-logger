const { logLevel } = require('kafkajs');
const winston      = require('winston');
const chalk        = require('chalk');
const { LEVEL }    = require('triple-beam');

const toWinstonLogLevel = level => {
    switch (level) {
        case logLevel.ERROR:
        case logLevel.NOTHING:
            return 'error'
        case logLevel.WARN:
        default:
            return 'warn'
        case logLevel.INFO:
            return 'info'
        case logLevel.DEBUG:
            return 'debug'
    }
};

const WinstonLogCreator = logLevel => {
    const logger = winston.createLogger({
        level: toWinstonLogLevel(logLevel),
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.json(),
            winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
            winston.format.printf(info => {
                return [
                    `${chalk.cyanBright(`[KAFKA]`)}${chalk.dim('[')}${info.level.replace(info[LEVEL], info[LEVEL].toUpperCase())}${chalk.dim(']:')}`,
                    info[LEVEL] === 'info' ? info.message : info[LEVEL] === 'error' ? chalk.redBright(info.stack || info.message) : chalk.yellow(info.message), 
                    chalk.dim(info['extra'] && typeof info['extra'] === 'object' ? JSON.stringify(info['extra']) : info['extra'] || ''),
                    `\n${chalk.italic(chalk.blackBright(`[${info.timestamp}]`))}\n`,
                ].join(' ');
            })
        ),
        transports: [
            new winston.transports.Console()
        ],
        handleExceptions: true
    })

    return ({ namespace, level, label, log }) => {
        const { message, ...extra } = log
        logger.log({
            level: toWinstonLogLevel(level),
            message,
            extra,
        })
    }
};

module.exports = WinstonLogCreator;