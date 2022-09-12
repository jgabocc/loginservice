const mongoose = require("mongoose");

exports.dbConnect = async ()=>{
    try{
        await mongoose.connect(
                process.env.DB_URI.replace("<username>",process.env.DB_USER).replace("<password>",process.env.DB_PASS), 
                { 
                    useNewUrlParser: true, 
                    useUnifiedTopology: true 
                }
        );
        console.log('Connected to DB successfuly')
    } catch(ex){
        console.log(ex);
        process.exit(1);
    }
}
