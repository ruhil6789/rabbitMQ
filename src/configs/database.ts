import mongoose, { createConnection, Connection } from 'mongoose'
import { ConfigType } from './configs'

async function createMongoDB(config: ConfigType) {

    try {
        const dbName = `${process.env.DB_NAME}`

        const url = `${config.DB_HOST}/${dbName}?authSource=${process.env.DB_AUTH_SOURCE}` //private

        const db = await mongoose.connect(url)
        // const result = createConnection(url)
        if(db){
        console.log('Connected to MongoDB...')
        }
        return db

    } catch (error) {
        console.log("error mongoConnect", error)
        throw error
    }
}
export default createMongoDB