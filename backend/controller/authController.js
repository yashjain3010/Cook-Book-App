const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieparse = require('cookie-parser');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

//Signup

const signup = async (req,res) => {
    const {email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    try{
        const user = await prisma.user.create({
            data : {
                email,
                password: hashedPassword,
            }
        })
        res.status(201).json(user);
    }
    catch(error){
        res.status(400).json({
            error: "User already exists"
        })
    }
}

//signin

const signin = async (req,res) => {
    const {email,password} = req.body;

    const user = await prisma.user.findUnique({
        where: {email},
    })

    if(user && await bcrypt.compare(password,user.password)){
        const token = jwt.sign({userid: user.id},JWT_SECRET);

        res.cookie('jwt',token,{
            httpOnly: true
        })

        res.json({
            message: 'Signed in Successfully'
        })
    }

    else{
        res.status(400).json({
            error: "Invalid Credentials"
        })
    }
}

module.exports = {
    signup,
    signin
}