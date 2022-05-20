const mongoose = require('mongoose')
const url = 'mongodb+srv://khao:25091999@realmcluster.grg9u.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async () => {
    try {
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB