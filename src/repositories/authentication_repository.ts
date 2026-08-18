import prisma from "../configs/prisma"

const create_user = async(email: string, password : string, user_name: string, verify_code : number)=>{
    try {
        const response = await prisma.user.create({data:{email:email,password:password,user_name:user_name,created_by:email, otp: (verify_code), otp_expires: new Date(Date.now()+ 5 * 60 * 100)}});
        return response;
    } catch (error) {
        throw error
    }
}


const get_user_by_email = async(email: string) => {
    try {
        const user = await prisma.user.findFirst({where:{
            email: email
        }});
        return user;
    } catch (error) {
        
    }
}

export default {create_user, get_user_by_email}