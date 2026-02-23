import type { RequestHandler } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { registerSchema, loginSchema, roleSchema } from "../validations/user.validation"
import { changeRole, createUser, findUserByEmail } from "../models/user.model"

const JWT_SERECT = process.env.JWT_SECRET as string;

export const register: RequestHandler = async (req, res) => {
    try {
        // validation request or inputs from the body 
        const data = registerSchema.parse(req.body);

        // find if user existed or not
        const existing  = await findUserByEmail(data.email);

        // if yes throw an error
        if (existing) 
            return res.status(400).json({ message: "Email already exists" })

        // hash password using request password with bcrypt
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // use createUser model to create user and pass them as parameters
        const user = await createUser(
            data.name,
            data.email,
            hashedPassword
        );

        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);

        const user = await findUserByEmail(data.email);
        if (!user) 
            return res.status(400).json({ message: "User does not exists "});

        // compare request password with password in database
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password "});

        // using jwt to sign with id and role, JWT_SECRET, and expire in 4h
        const token = jwt.sign(
            { id: user.id, role: user.role},
            JWT_SERECT,
            { expiresIn: "2h"}
        )

        // store token in httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,              // cannot be accessed by JS
            // secure must change to true in production
            secure: false,               // true in production (HTTPS)
            sameSite: "lax",             // protects againts CSRF
            maxAge: 60 * 60 * 1000,      // 60 minutes
        })

        res.json({ message: "Login successful" });
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
};

export const updateRole: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const data = roleSchema.parse(req.body);

    try {
        const updateRole = await changeRole( data.role, Number(id) );

        res.status(200).json({ message: "Role updated", user: updateRole});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

};

export const logout: RequestHandler = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    
    res.json({ message: "Logged out "});
};