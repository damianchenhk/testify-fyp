const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
    // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name,
                role: user.role,
                ongoing_courses: user.ongoing_courses
            };
    // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({error: 'Unable to find this user'}));
});

router.post('/allUsers', (req, res) => {
    User.find({_id: {$ne: req.body.user_id}}).sort({ $natural: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json({nocoursesfound: 'No Users Found'}));
});

router.post('/allUsersRecent', (req, res) => {
    User.find({_id: {$ne: req.body.user_id}}).sort({ $natural: -1 }).limit(5)
        .then(users => res.json(users))
        .catch(err => res.status(404).json({nocoursesfound: 'No Users Found'}));
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

module.exports = router;