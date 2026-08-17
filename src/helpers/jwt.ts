import jwt, { SignOptions } from 'jsonwebtoken'

const generate_token = async(user_id: string, exp: SignOptions["expiresIn"])=>{
    try {
        const token =  jwt.sign({
            "sub":"sigin",
            "user":user_id
        },
        process.env.JWT_SECRET!,
        {
            expiresIn:exp
        }
    )
    return token;
    } catch (error) {
        throw error
    }
}

export default generate_token