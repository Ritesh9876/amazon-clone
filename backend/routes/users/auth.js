const router = require("express").Router();
const USER_MODEL = require("../../models/UserModel")




router.post('/signup',async (req,res) =>{
    try{
        let {
            userName,
            email,
            password,
        }= req.body

        const isExits= await USER_MODEL.findOne({email})

        if(isExits)
        {
            return res.status(200).json({
                message:"User already exists",
                success:false
            })
        }
        const newUser= new  USER_MODEL({
            userName,
            email,
            password,
        })
        await newUser.save();
        return res.status(200).json({
            message: "User has been registered",
            success:true
        })
    }catch(err){
        return res.status(400).json({
            error:err.message,
            success:false
        })
    }
})