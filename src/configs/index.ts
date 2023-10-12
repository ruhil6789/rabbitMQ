import createLogger from "./logger";
import createMongoDB from "./database";
import createConfigs, { ConfigType } from "./configs";
const configs = {
    createConfigs,
    createLogger,
    createMongoDB
}
export {
    ConfigType
}

export default configs