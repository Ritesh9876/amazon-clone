const mongoose= require('mongoose');

const DB_URL=process.env.DB_STRING;

module.exports.connectDB= async function() {
    await mongoose.connect(
        DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then(() =>console.log("MONGODB Connected"))
    .catch((err) =>console.log(err))
}

