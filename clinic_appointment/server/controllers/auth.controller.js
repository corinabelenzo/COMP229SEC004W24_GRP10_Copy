import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import config from "./../../config/config.js"
//import expressJwt  from "express-jwt"
import { expressjwt } from "express-jwt";

const signin = async (req, res) => {
    try {
        let user = await User.findOne({"email":req.body.email})
        if (!user)
        return res.status("401").json({Error: "User not found"})
    if (!user.authenticate(req.body.password)) {
        return res.status("401").send({Error: "Email and password don't match"})
    }
    const token = jwt.sign({_id: user._id}, config.jwtSecret)
    res.cookie("t", token, {expire: new Date() + 9999})
    return res.json({
        token,
        user: {
            _id: user.id,
            name: user.name,
            email: user.email
        }
    })
    }catch (err) {
        return res.status("401").json({Error: "Could not sign in"})
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status("200").json({
        message: "Signed out"
    })
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: "auth"
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if(!(authorized)) {
        return res.status("403").json({
            error: "User is not authorized"
        })
    }
    next()
}
export default {signin, signout, requireSignin, hasAuthorization}