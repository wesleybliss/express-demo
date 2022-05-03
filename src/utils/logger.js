import pino from 'pino'
import config from '@/config'

const logger = name => pino({
    name,
    level: config.log.level,
    transport: {
        target: 'pino-pretty',
        options: {
            // colorize: true,
            ignore: 'pid,hostname,time',
        },
    },
})

export default logger
