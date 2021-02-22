const db = require("../config/db.config");
const User = db.users;
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signUp = async (req, res) => {
    // Validating the form
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param
        })
    }

    // Checking if the user trying to register already exists
    if(await User.findOne({where: {email: req.body.email}})){
        return res.status(400).json({message: 'Email Exists'});
    }

    // Generating a hashed password and saving user in DB
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: 1
    }

    try {
        const data = await User.create(user);
        res.json(data);
    } catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}
exports.signIn = async (req, res) => {
    const user = await User.findOne({where: {email: req.body.email}});

    if(!user){
        return res.status(404).json({
            message: 'Wrong Credentials'
        })
    }

    const matchPassword = await bcrypt.compare(req.body.password, user.password);

    if(!matchPassword){
        return res.status(404).json({
            message: 'Wrong Credentials'
        })
    }

    const token = jwt.sign({id: user.id, role: user.role}, process.env.SECRET);

    res.cookie("token", token, {expire: 60 * 60 * 24 * 30});

    const {id, name, email, role} = user;

    return res.json({token, user: {id, name, email, role}});
}

exports.signOut = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signed out"
    });
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256']
})

exports.userData = (req, res, next) => {
    const token = req.headers.authorization;
    const newToken = token.replace("Bearer ", "");
    jwt.verify(newToken, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
            message: 'Invalid Token'
            });
        } else {
            req.user = user;
            return next();
        }
    })
}
exports.isAdmin = (req, res, next) => {
    if(req.user.role === 0){
        return next();
    }
    return res.status(403).json({
        message: 'You are not an admin'
    })
}