import { Request, Response } from 'express'
import commentObject from '../utils/user'
import userSchema from '../model/user'
import jwt from "jsonwebtoken";


export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { error, value } = commentObject.validate({ name, email, password })
    if (error?.details) throw error;
  
    try {
      const user = await userSchema.findOne({ email });
      if (user) {
        return res.status(409).json({ message: 'User already exists.' });
      }
  
      const newUser = new userSchema(value);
      newUser.save();
      return res.status(201).json({ message: 'user created' });

    } catch (error) {
      console.error(error);
    }
  }


export async function login(req: Request, res: Response) {
  
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    } else {
        if (password !== user.password) {
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user.name,
            id: user._id
        };
        jwt.sign(payload, "secret", (err: any, token: any) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
    }
  }
