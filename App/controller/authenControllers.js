
const users = require('../model/Users');
const { validationResult } = require('express-validator');
const sha256 = require('crypto-js/sha256');
const crypto = require('crypto');


class AuthLoginController {
    signUp(req, res, next) {
        res.render('../views/signUp.ejs');
    }

    login(req, res, next) {
        res.render('../views/login.ejs');
    }

    // postLogin(req, res, next) {

    //     const password = crypto.createHash('sha256').update(req.body.password).digest('base64')

    //     const userId = users.findOne({ id: req.body.id, password: password }).then(users => {

    //         res.redirect("/")
    //     }).catch(err => res.send(err))
    // }
    postLogin = async (req, res, next) => {
        const id = req.body.id
        const password = crypto.createHash('sha256').update(req.body.password).digest('base64');

        console.log(id);
        // if (!id || !password) {
        //     return res.status(400).json({
        //         success: false, message: 'Missing user name , email or password'
        //     })
        // }

        const user = users.findOne({ id: id, password: password }).then((user) => {
            if (user) {
                res.redirect('/')
            }
            else {
               
                res.redirect('/login')
            }
        })

    }


    postSignUp = async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("Lỗi");
            return;
        }
        let filePath
        if (req.file) {
            filePath = req.file.filename
        } else {
            filePath = ''
        }
        let user = await new users({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
            avatar: filePath
        })

        await user.save().then(() => {
            res.redirect("/login")
        })

    }
    getEditUser = async (req, res, next) => {
        console.log(req.params.id)

        let userId = req.params.id

        let byIdUser = await users.findById({
            _id: userId
        })
        res.render('../views/edit.ejs', { userId: byIdUser })
    }
    homeManage = async (req, res, next) => {
        users.find({}).then((users) => {
            res.render("../views/index.ejs", { allUser: users })
        })
    }
    deleteUser = async (req, res) => {
        const userId = req.params.id
        console.log("check", userId)
        try {
            const deletedUser = await users.findOneAndDelete({ _id: userId })
            console.log(deletedUser)

            if (!deletedUser)
                return res.status(401).json({
                    success: false,
                    message: 'Id not found'
                })
            res.redirect('/')
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Err from sever'
            })
        }
    }
    postEditUser = (req, res, next) => {
        const userId = req.params.id
        console.log(userId)
        const user = req.body
        users.updateOne({ _id: userId }, req.body).then((user) => {
            res.redirect('/')

        })
    }

}

module.exports = new AuthLoginController();