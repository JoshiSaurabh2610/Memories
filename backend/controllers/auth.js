import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import mailjet from '../utils/MAILJET';
import crypto from 'crypto';

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name, email, password,
        });
        sendToken(user, 201, res);
    } catch (err) {
        return next(error);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and Password", 400));
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
        console.log('you are logged in');
        sendToken(user, 200, res);

    } catch (err) {
        return next(err);
    }
}

export const forgotPassword = async (req, res, next) => {
    // res.send("forgotPassword Route");
    const { email } = req.body;
    // console.log(email);
    try {
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            // console.log("user not found");
            return next(new ErrorResponse("Email Could not be sent", 404));
        }

        const resetToken = user.getResetToken();
        await user.save();

        const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

        const msg = `
            <h1>You have requested a password reset </h1>
            <p>Dear username,<br/>
            We got Request for Reset Password from this account<br/>
            this link if valid for only 10min <br/>
            click below to Reset your password <br/>
            Techies Code <br/>
            </p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            await mailjet({
                toEmail: user.email,
                toName: user.username,
                subject: "Password Reset Request",
                text: msg
            });
            res.status(200).json({ sucess: true, data: "Email Send Sucessfully" })
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            console.log("email not send");
            console.log(err);
            return next(new ErrorResponse("Email Could Not be Sent", 500));
        }

    } catch (err) {
        console.log(err);
        return next(new ErrorResponse("Email Could Not be Sent", 400));
    }
}

export const resetPassword = async (req, res, next) => {
    console.log(req.params.resetToken);
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest('hex');
    // console.log(resetPasswordToken);
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(200).json({
            sucess: true,
            data: "password Reseted Succesfully"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedtoken();
    res.status(statusCode).json({ sucess: true, token, user })
}