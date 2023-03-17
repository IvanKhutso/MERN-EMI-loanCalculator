import jwt from 'jsonwebtoken'

export const verifyToken = async(req, res, next) => {
    try {
        let token = await req.header('Authorization');
        console.log(token)

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        };

        const verified = jwt.verify(token, process.env.JWT_SECRETE);
        req.user = verified;
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}