const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user from sign up 
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            userName: req.body.userName,
            userPassword: req.body.userPassword,
        });

        // set up the session loggedIn status set to true
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(newUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user log in 
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        // make sure that the userName matches an existing userName, and if so that the password matches
        if (!userData) {
            res
                .status(400)
                .json({message: 'Incorrect userName or password. Please try again.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect userName or password. Please try again.'});
            return;
        }

        //if the entered userName exists, and entered password matches the stored password, then set up the sessions loggedIn variable and set to true
        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: userData, message: 'You are now logged in!'});
        });
    } catch (err) {
        console.log('there was a server error: ' + err);
        res.status(500).json(err);
    }
})