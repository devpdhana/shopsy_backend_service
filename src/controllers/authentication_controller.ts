import express, {Request, Response} from 'express'
import auth_service from '../services/authentication_service';

const authentication_router = express.Router();

authentication_router.post("/signup",async(req: Request, res: Response)=>{
    try {
        const {email,password} = req.body;
        const response = await auth_service.create_user_record(email,password);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal server errror"
        })
    }
})

authentication_router.post("/signin",async(req: Request, res: Response)=>{
    try {
        const {email,password} = req.body;
        const response = await auth_service.signin_user(email,password);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: `Internal server errror ${error}` 
        })
    }
})
authentication_router.get("/refresh",async(req: Request, res: Response)=>{
    try {
        const refresh_token = req.cookies.refresh_token;
        const response = await auth_service.refresh_tokens(refresh_token);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: `Internal server errror ${error}`
        })
    }
})
export default authentication_router