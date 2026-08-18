import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { CustomJwtPayload } from '../types/express';

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
        req.payload = decoded_token as CustomJwtPayload
        next()
    } catch (error) {
        res.status(401).json({
            data: null,
            status: 401,
            message:"Token expried or invalid"
        })
        throw error
    }
}

export default authenticate