import crypto from 'crypto'

export const generate_otp = ()=>{
    try {
        return crypto.randomInt(100000,1000000);
    } catch (error) {
        
    }
}