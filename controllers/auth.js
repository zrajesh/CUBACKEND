const User = require("../models/user");
const Alumini = require("../models/alumini");
const Msde = require("../models/msde");
const jwt = require('jsonwebtoken');

// STUDENT
exports.signUp = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: err
            });
        }
        res.json(user);
    });
}

exports.signIn = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                err: "User email not found"
            })
        }
        if(!user.authenticate(password)) {
            return res.status(401).json({
                err: "Password does not match"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.cookie("token", token, {expire: new Date() + 9999});
        res.json({token, user: {user}});
    });
}

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        msg: "User signout successfully"
    })
}

exports.getStudents = (req, res) => {
    User.find((err, users) => {
        if(err || !users) {
            return res.status(400).json({
                err: "Users not found"
            })
        }
        res.json(users);
    });
}

// ALUMINI
exports.signUpAlumini = (req, res) => {
    const alumini = new Alumini(req.body);
    alumini.save((err, alumini) => {
        if(err) {
            return res.status(400).json({
                err: err
            });
        }
        res.json(alumini);
    });
}

exports.signInAlumini = (req, res) => {
    const {email, password} = req.body;
    Alumini.findOne({email}, (err, alumini) => {
        if(err || !alumini) {
            return res.status(400).json({
                err: "User email not found"
            })
        }
        if(!alumini.authenticate(password)) {
            return res.status(401).json({
                err: "Password does not match"
            })
        }
        const token = jwt.sign({ _id: alumini._id }, process.env.SECRET);
        res.cookie("token", token, {expire: new Date() + 9999});
        res.json({token, alumini: {alumini}});
    });
}

exports.updateAlumini = (req, res) => {
    Alumini.findByIdAndUpdate(
        {_id: req.body._id},
        {aluminiVerify: req.body.aluminiVerify},
        {new: true,},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    err: err
                })
            }
            res.json(user)
        }
    )
}

exports.deleteAlumini = (req, res) => {
    Alumini.findByIdAndDelete(
        {_id: req.params.id},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    err: err
                })
            }
            res.json({
                msg: "USER DELETED SUCCESSFULLY"
            })
        }
    )
}

exports.getAluminis = (req, res) => {
    Alumini.find((err, aluminis) => {
        if(err || !aluminis) {
            return res.status(400).json({
                err: "Aluminis not found"
            })
        }
        res.json(aluminis);
    });
}

exports.getAluminisByRegNo = (req, res) => {
    Alumini.find({'regNo': req.params.regNo},(err, aluminis) => {
        if(err || !aluminis) {
            return res.status(400).json({
                err: "Aluminis not found"
            })
        }
        res.json(aluminis);
    });
}

exports.getAluminisByDomain = (req, res) => {
    Alumini.find({'domain': req.params.domain},(err, aluminis) => {
        if(err || !aluminis) {
            return res.status(400).json({
                err: "Aluminis not found"
            })
        }
        res.json(aluminis);
    });
}

exports.getAluminisByGender = (req, res) => {
    Alumini.find({'gender': req.params.gender},(err, aluminis) => {
        if(err || !aluminis) {
            return res.status(400).json({
                err: "Aluminis not found"
            })
        }
        res.json(aluminis);
    });
}

exports.getAluminisByAuth = (req, res) => {
    Alumini.find({'aluminiVerify': req.params.auth},(err, aluminis) => {
        if(err || !aluminis) {
            return res.status(400).json({
                err: "Aluminis not found"
            })
        }
        res.json(aluminis);
    });
}

// MSDE
exports.signUpMsde = (req, res) => {
    const msde = new Msde(req.body);
    msde.save((err, msde) => {
        if(err) {
            return res.status(400).json({
                err: err
            });
        }
        res.json(msde);
    });
}

exports.signInMsde = (req, res) => {
    const {email, password} = req.body;
    Msde.findOne({email}, (err, msde) => {
        if(err || !msde) {
            return res.status(400).json({
                err: "User email not found"
            })
        }
        if(!msde.authenticate(password)) {
            return res.status(401).json({
                err: "Password does not match"
            })
        }
        const token = jwt.sign({ _id: msde._id }, process.env.SECRET);
        res.cookie("token", token, {expire: new Date() + 9999});
        res.json({token, msde: {msde}});
    });
}

