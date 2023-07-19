const jwt = require("jsonwebtoken");
const JWT_SECRET = "@iNotebook#Secret";

const fetchUser = async (req, res, next) => {
    //Get the user from the jwt token and add id tothe object
    const token = await req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using valid token" });
    }

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
}

module.exports = fetchUser;