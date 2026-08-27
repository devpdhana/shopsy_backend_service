import auth_repo from "../repositories/authentication_repository";
import { api_response_dto } from "../dtos/api_response_dto";
import { signup_response_dto } from "../dtos/auth_dto";
import bcrypt from "bcryptjs";
import generate_token from "../helpers/jwt";
import jwt from 'jsonwebtoken'
import { TokenPayload } from "../dtos/jwt";
import { generate_otp } from "../helpers/otp";
import { send_email } from "./email_service";

const create_user_record = async (email: string, password: string) => {
    try {
        const user_name = email.split('@')[0];
        const hashed_password = bcrypt.hashSync(password, 10);
        const is_user_available = await auth_repo.get_user_by_email(email);
        if (is_user_available) {
            const in_valid_data: api_response_dto<null> = {
                data: null,
                status: 400,
                message: "Email already available"
            }
            return in_valid_data;
        }
        const verify_code = generate_otp()
        const user = await auth_repo.create_user(email, hashed_password, user_name, verify_code!);
        await send_email(email,"Verification Code", `<h1> ${verify_code} </h1>`);
        const user_response: api_response_dto<signup_response_dto> = {
            data: {
                email: user.email,
                user_name: user.user_name,
                user_id: user.user_id,
                created_at: user.created_at,
                created_by: user.created_by ?? "",
                modified_at: user.modified_at,
                modified_by: user.modified_by ?? ""
            },
            status: 201,
            message: "User created successfully"
        }
        return user_response
    } catch (error) {
        throw error
    }
}


const signin_user = async (email: string, password: string) => {
    try {
        const is_user_available = await auth_repo.get_user_by_email(email);
        if (!is_user_available) {
            const in_valid_data: api_response_dto<null> = {
                data: null,
                status: 404,
                message: "User not found"
            }
            return in_valid_data;
        }
        const is_valid: boolean = bcrypt.compareSync(password, is_user_available.password);
        if (!is_valid) {
            const in_valid_data: api_response_dto<null> = {
                data: null,
                status: 404,
                message: "Email password incorrect"
            }
            return in_valid_data;
        }
        const access_token = await generate_token(is_user_available.user_id, "1w");
        const refresh_token = await generate_token(is_user_available.user_id, "2w");
        const tokens: { access_token: string; refresh_token: string } = {
            "access_token":access_token,
            "refresh_token":refresh_token
        }
        const result: api_response_dto<{ access_token: string; refresh_token: string }> = {
            data: tokens,
            status: 200,
            message: "Signin success"
        }
        return result;

    } catch (error) {
        throw error
    }
}


const refresh_tokens = async(refresh_token: string) => {
    try {
        const decoded_data = jwt.verify(refresh_token,process.env.JWT_SECRET!);
        if (typeof decoded_data == "string"){
            throw Error("token in valid")
        }
        const payload  = decoded_data as TokenPayload;
        const token_to_access = await generate_token(payload.user, "1w");
        const token_to_refresh = await generate_token(payload.user, "2w");
        const tokens: { access_token: string; refresh_token: string } = {
            "access_token":token_to_access,
            "refresh_token":token_to_refresh
        }
        const result: api_response_dto<{ access_token: string; refresh_token: string }> = {
            data: tokens,
            status: 200,
            message: "refresh tokens success"
        }
        return result;
    } catch (error) {
        throw error
    }
}


const verify_code = async(verify_code : number, email: string)=>{
    try {
        const user = await auth_repo.get_user_by_email(email);
        if (user?.otp == verify_code && user.otp_expires! <= new Date(Date.now())){
            const response : api_response_dto<boolean> = {
                data: true,
                status : 200,
                message : "Otp verified successfully"
            }
            return response;
        }else {
            const response : api_response_dto<boolean> = {
                data: true,
                status : 401,
                message : "Otp invalid or exprid"
            }
            return response;
        }
    } catch (error) {
        
    }
}

export default {create_user_record, signin_user, refresh_tokens, verify_code}