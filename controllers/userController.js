import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";


export const signIn = async (req, res) => {
   
    try {
        const { email, password } = req.body;

    const user = await User.userFindByEmail(email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
     
    console.log("User found:", user);
     
    console.log('user password:' , user.password);
    console.log('provided password:' , password);
    console.log('comparing passwords:' , user.password === password);   

    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.user_id,
                email: user.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

    return res.status(200).json({ success: true,  message: "Sign in successful", data:{user , token} }); 

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// controller for create a new user

export const createUser = async (req, res) => {

   console.log("🟢🟢🟢 Creating user with data:", req.body);

    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password || !role ) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, email, password and role are required" 
            });
        }

        // Check if user already exists
        const existingUser = await User.userFindByEmail(email);
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: "Email already registered" 
            });
        }

        // Create new user
        const newUser = await User.createNewUser(name, email, password, role);

        console.log("🟢🟢🟢 New user created:", newUser);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });

    } catch (error) {
        console.error('Create user error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

