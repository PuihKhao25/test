
const users = require('../model/Users');
const { validationResult } = require('express-validator');
const sha256 = require('crypto-js/sha256');
const crypto = require('crypto');
class AuthController {

    postLogin = async (req, res, next) => {
        const id = req.body.id
        const password = crypto.createHash('sha256').update(req.body.password).digest('base64');

        console.log(id);
        if (!id || !password) {
            return res.status(400).json({
                success: false, message: 'Missing user name , email or password'
            })
        }

        const user = users.findOne({ id: id, password: password }).then((user) => {
            if (user) {
                res.json('thành công')
            }
            else {
               
                res.json('thất bại')
            }
        })

    }

    
    postSignUp = async (req, res, next) => {
        const errors = validationResult(req);
        try {
            
        if (!errors.isEmpty()) {
            console.log("Lỗi");
            res.json('lỗi')
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
            res.json('thành công')
        })
        } catch (e) {
            res.json('thất bại')
        }

    }
    homeManage = async (req, res, next) => {
        users.find({}).then((users) => {
            res.json({
                users
            })
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
            res.json({
                success: "thành công"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Err from sever'
            })
        }
    }
    postEditUser = (req, res, next) => {
        try {
            const userId = req.params.id
            console.log(userId)
            const user = req.body
            users.updateOne({ _id: userId }, req.body).then((user) => {
                res.json({
                    success: "thành công"
                })

            })

        } catch (e) {
            console.log(e)
            res.json(
                {
                    err: 'thất bại '
                }
            )
        }
    }
}

module.exports = new AuthController();