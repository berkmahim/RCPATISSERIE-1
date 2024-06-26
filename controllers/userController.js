import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/login')
    } catch (error) {
        console.log('ERROR', error);

        let errors2 = {};

        
        if (error.code === 11000) {
            errors2.email = 'The Email is already registered';
        }

        console.log("errors2 :", errors2)

        res.status(400).json(errors2);
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            });
        }

        if (same) {
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });

            res.redirect('/');
        } else {
            res.status(401).json({
                succeded: false,
                error: 'Paswords are not matched',
            });
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}



export {createUser, loginUser}