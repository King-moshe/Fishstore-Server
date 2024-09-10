const bcrypt = require('bcrypt');
const { UserModel, validateUser, validateLogin, createToken } = require('../model/userModel');

module.exports = {
    testEndpoint: async (req, res) => {
        res.json({ message: "Users endpoint!" })
    },
    usersList: async (req, res) => {
        try {
            let data = await UserModel.find({})
            res.json(data);
        }
        catch (error) {
            console.log(error);
            res.status(502).json({ error })
        }
    },
    userSignUp: async (req, res) => {
        let validBody = validateUser(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }
        try {
            let user = new UserModel(req.body);
            user.password = await bcrypt.hash(user.password, 10);
            await user.save();
            user.password = '****';
            res.json(user);
        }
        catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ message: "Email already registered", code: 11000 })
            }
            console.log(error);
            res.status(502).json({ error });
        }
    },
    userLogIn: async (req, res) => {
        let validBody = validateLogin(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }
        try {
            let user = await UserModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ msg: "Email or Password Worng!" });
            }
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json({ msg: "Email or Password Worng!" })
            }
            let token = createToken(user._id, user.role, user.name);
            res.json({ token, role: user.role, name: user.name })
        }
        catch (error) {
            console.log(error);
            res.status(502).json({ error });
        }
    },
}