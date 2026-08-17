import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const authenticate = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const auth_header = req.headers.authorization;
        if (!auth_header){
            res.status(401).json({
                status:401,
                data:null,
                message:"Auth token is missing"
            })
        }
        const token = auth_header?.split(" ")[1];
        const decoded_token = await jwt.verify(token!, process.env.JWT_SECRET!);
    } catch (error) {
        throw error
    }
}

export default authenticate