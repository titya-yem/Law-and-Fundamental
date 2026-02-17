import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
    // defined type of user of id and role
    user?: {
        id: number
        role: string
  }
}

interface JwtPayloadCustom extends jwt.JwtPayload {
  id: number
  role: string
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    // get authorization of headers from request
    // if it exists we split it and get the second one
    // EXPAMPLE: Bearer (token), so we use split method to get token only
    const token = req.headers.authorization?.split(" ")[1]

    // if it doesn't exist = no login
    if (!token)
        return res.status(401).json({ message: "No token" });

    try {
        // then we decond it with jwt verify has token, JWT_SECRET
        // as id and role
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadCustom & {
            id: number
            role: string
        };

        // then assign decoded to req.user and next middleware
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    // get request role of user !== admin cannot do anything
    if (req.user?.role !== "admin")
        return res.status(403).json({ message: "Forbiden"});

    next();
};