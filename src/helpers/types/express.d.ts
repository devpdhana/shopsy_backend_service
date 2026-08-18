import { JwtPayload } from "jsonwebtoken"

export interface CustomJwtPayload extends JwtPayload {
  user: string
}

declare global {
  namespace Express {
    interface Request {
      payload?: CustomJwtPayload
    }
  }
}

export {}