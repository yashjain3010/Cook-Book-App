const jwt = require('jsonwebtoken')

//authenicationMiddlewaare

const authenticationToken = (req,res,next) => {
    const token = req.cookies.jwt;
    if(!token){
        res.status(401).json({
            msg: "Invalid User"
        });
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if(err) return res.status(403).json(err);
        req.user = user;
        next();
    })
}

module.exports = authenticationToken;