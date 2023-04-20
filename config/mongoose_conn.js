const mongoose = require('mongoose');
async function main() {
    mongoose.connect('mongodb://localhost:27017/employee_db');
}
main().then((data) => {
    console.log('connected successfully');
}).catch((err) => {
    console.log(err);
})