import pkg from '@root/package.json'

export const root = async (req, res) => {
    
    res.json({
        [pkg.name]: {
            version: pkg.version,
        },
    })
    
}
