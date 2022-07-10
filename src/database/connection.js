const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://FIndingRooms:${process.env.PASSWORD}@cluster0.4k2d8.mongodb.net/${process.env.DATABASENAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connection successfull...."))
    .catch((error) => console.log("connection Failed...." + error));