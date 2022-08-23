const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/the-social-network",
    {
        useNewURLParser: true,
        useUnifiedTopology: true,
    });

    //execute mongo 
mongoose.set("debug", true);

module.exports= mongoose.connection; 