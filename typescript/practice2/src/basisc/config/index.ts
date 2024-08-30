
// const env = 'local'
// const config = await import('./config.' + 'local')
import local from "./config-local"
import dev from "./config-dev"

const getConfig = (): {[P in any]: any} => {
    const env: string = 'local'
    if (env === 'local') return local
    return dev
}

export default getConfig
