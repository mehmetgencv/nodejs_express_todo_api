const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connet to the Mongo DB");
    })
    .catch((err)=> {
        console.log("NOT connet to the DB : " + err);
    })