import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const start = async () => {
    
    const app = (await import('./app')).default
    const config = (await import('./config')).default
    
    const { host, port } = config
    const uri = `http://${host}:${port}`
    
    app.listen(port, host, () => {
        console.info(`Listening on ${uri}`)
        console.info(`CORS whitelist ${config.cors.whitelist.enabled ? 'is' : 'is not'} enabled`)
        // console.info(JSON.stringify(config, null, 4))
    })
    
}

start()
