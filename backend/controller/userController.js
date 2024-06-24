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
            res.status(201).json({
                _id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                email: newUser.email,
                age: newUser.age,
                city: newUser.city,
                created: newUser.createdAt,
                updated: newUser.updatedAt
            })

        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }

}

export const getUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        console.log(username, password)
        const user = await User.findOne({ username })
        const isPassCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPassCorrect) {
            return res.status(400).json({ error: "Invalid username or Password." })
        }

        console.log(`User fetched ${user.email}`)
        console.log(user)
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            age: user.age,
            city: user.city,
            created: user.createdAt,
            updated: user.updatedAt
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updateUser = (req, res) => {
    try {

        const { username } = req.body;
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const fetchAll = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');
        console.log(allUsers)
        res.status(201).json(allUsers);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const editUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username, email, age, city } = req.body;

    try {

        await User.findByIdAndUpdate(id, { firstname, lastname, username, email, age, city })
        res.status(200).json({ message: 'User Updated Successfully.' })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User Deleted Successfully.' })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const editedUser = async (req, res) => {
    const { firstname, lastname, username, age, city } = req.body;
    try {

        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.age = age;
        user.city = city;

        await user.save();
        res.json(user);

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const fetchUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error", message: error })
    }
}