const express = require('express');
const router = express.Router();
const otpModel = require('../model/otpData');
const nodemailer = require('nodemailer');

require('dotenv').config();

router.use(express.json());
router.use(express.urlencoded({extended:true}))


router.post('/send-otp',async(req,res)=>{
    const {email} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now()+5*60000);

    const otpEntry = new otpModel({email, otp, expiresAt});
    await otpEntry.save();


    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS

        }
    });

    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Your OTP Code',
        text:`Your OTP code is ${otp} .It will expires in 5 minutes.`
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error) {
            return res.status(500).json({message:'Error sending email',error});
        }
        res.status(200).json({message:'OTP sent successfully'});
    });
});

router.post('/verify-otp',async(req,res)=>{
    const {email, otp}=req.body;
    const otpEntry = await otpModel.findOne({email,otp});

    if(!otpEntry || new Date() > otpEntry.expiresAt) {
        return res.status(400).json({message:'Invalid or expires OTP'});
    }

    await otpModel.deleteOne({email, otp});

    res.status(200).json({message:'OTP verified'});

});

module.exports = router;