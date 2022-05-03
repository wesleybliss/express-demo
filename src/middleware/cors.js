import cors from 'cors'
import config from '../config'

const readWhitelist = () => {
    
    const { file } = config.cors.whitelist
    
    if (!fs.existsSync(file))
        fs.writeFileSync(file, JSON.stringify([]), 'utf8')
    
    const data = fs.readFileSync(file, 'utf8')
    
    try {
        return JSON.parse(data).map(it => ({
            ...it,
            pattern: new RegExp(it.pattern)
        }))
    } catch (e) {
        console.warn('readWhitelist', e)
        return []
    }
    
}

const corsOptions = {
    
    origin: (origin, callback) => {
        
        if (!origin || typeof origin === 'undefined') {
            if (config.cors.allowUndefined) {
                // Some GET requests (from cURL, etc.) have undefined origins
                return callback(null, true)
            } else {
                console.warn('CORS blocked no-origin request')
                return callback(new Error('Unauthorized'), false)
            }
        }
        
        // Optionally restrict origins here
        if (origin && config.cors.logRequests)
            console.log('CORS', origin)
        
        if (config.cors.whitelist.enabled) {
            
            const whitelist = readWhitelist()
            // console.log('reading whitelist', whitelist)
            
            if (!whitelist.some(it => it.enabled && it.pattern.test(origin))) {
                console.error('CORS origin', origin, 'did not match\n', whitelist.join('\n'))
                return callback(new Error('Unauthorized'))
            }
            
        }
        
        callback(null, true)
        
    }
    
}

export default cors(corsOptions)
