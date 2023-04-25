const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
async function main() {
    mongoose.connect(process.env.MONGO_URI);
}
main().then((data) => {
    console.log('connected successfully');
}).catch((err) => {
    console.log(err);
})