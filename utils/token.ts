import jwt from "jsonwebtoken"
import configs from "../src/configs"
const con = configs.createConfigs()

const generateToken = (payload: { id: string, role: number }) => {
    return jwt.sign(payload, con.SECRET_KEY, { expiresIn: '12h' })
}

const verifyToken = (token: string) => {
    return jwt.verify(token, con.SECRET_KEY)
}
export {
    generateToken,
    verifyToken
}