import express from "express";
const authRouters = express.Router()
import { login, signup } from "../controllers/auth_controller.js";

authRouters.post('/signup', signup);
authRouters.post('/login', login);



export default authRouters;