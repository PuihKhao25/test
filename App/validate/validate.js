const { body, validationResult } = require("express-validator");

//validate Register Form
const validateRegisterUser = () => {
    return [
        body("id")
            .notEmpty().withMessage("Id: Nhập từ 4-16 kí tự bao gồm cả chữ thường và số"),
        body("email")
            .notEmpty().withMessage("Email: trống")
            .isEmail().withMessage("Bạn cần nhập đúng: aaa@abc.com"),

        body("password").notEmpty().withMessage("Password: Nhập từ 4-16 kí tự bao gồm cả chữ thường và số"),

        body("name").notEmpty().isLength({ max: 16 }).withMessage("Name: Tối đa 16 kí tự"),
        body("avatar")
        .notEmpty().withMessage("avatar: kích thước tối đa 512 x 512 (px)"),
    ];
};

//validate Login Form


//Error Register
const validationRegError = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const alert = errors.array();
        res.render("../views/signUp.ejs", { alert: alert });
    }
    next();
};


module.exports = {
    validateRegisterUser,
    validationRegError,
};