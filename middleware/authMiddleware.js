import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

// verify token


export const verifyToken = async (req, res, next) => {

       console.log('🔑🔑verify token using ' , req.headers.authorization); 

    try {

        const token = req.headers.authorization?.split(' ')[1];
        console.log('🔑🔑🟢🟢'  , token);

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("🟣🟣🟣" , decoded);

        const user = await User.userFindById(decoded.userId);
          
        console.log("users :::" , user );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


// verify is admin 

export const isAdmin = async (req, res, next) => {

     console.log("🟡🟡🟡 Checking admin role for user:", req.user);

    if (req.user.role_name !== 'Admin') {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

