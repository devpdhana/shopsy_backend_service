import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})


export const send_email = async(to : string, subject : string, html: string )=>{
    try {
        const response = await transport.sendMail({
            to,
            subject,
            html
        })
        return response
    } catch (error) {
        throw error
    }
} 