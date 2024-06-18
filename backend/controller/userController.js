import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const signUp = async (req, res) => {

    try {

        const { firstname, lastname, username, email, password, age, city } = req.body;

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            age,
            city
        })

        if (newUser) {
            await newUser.save();
            console.log(`User created ${newUser.email}`);

            res.status(201).json(newUser)
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }

}