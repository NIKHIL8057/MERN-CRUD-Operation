import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";

// create user
export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      // password: hashPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// get user
export const getUser = async (req,res) => {
   try {
       const user = await User.find();

       if(!user) {
        return res.status(400).json({success:false,message:"User not found"})
       }

       return res.status(200).json({success:true, user})

   } catch (error) {
     return res.status(400).json({success:false,message:"Srver error"})
   }
}
// get user by id 
export const getUserById = async (req,res) => {
   try {
      const { id } = req.params;

      const user = await User.findById(id);

      if(!user) {
        return res.status(400).json({success:false,message:"User not found"})
      }

      return res.status(200).json({success:true,user})

   } catch (error) {
     return res.status(400).json({success:false,message:"server error"})
   }
}
// user update 
export const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// user delete
export const userDelete = async(req,res) => {
  try {
    
    const {id} = req.params;

    const user = await User.findByIdAndDelete(id);

     if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

  } catch (error) {
         return res.status(400).json({success:true,message:false})
  }
}