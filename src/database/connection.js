const mongoose = require('mongoose');
password = "2k8VaP2249cdlKhX";

mongoose.connect("mongodb+srv://FIndingRooms:2k8VaP2249cdlKhX@cluster0.4k2d8.mongodb.net/FindingRooms?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connection successfull...."))
    .catch((error) => console.log("connection Failed...." + error));