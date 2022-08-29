const SRV = require('./app');
port = SRV.port === 0 ? process.env.PORT :  SRV.port;
const mongoose = require("mongoose");


const server = SRV.app.listen(port, ()=>{
    console.info(`The Service Is ${SRV.ServiceStatus? 'ON':'OFF'}`)
    console.info(`${SRV.message}: ${server.address().port}`); 
    console.info(`Open chrome is set to: ${SRV.openChrome}`)
    console.info(`Testing:${SRV.testing}`)
    if(SRV.openChrome) {
        require("start-chrome")(SRV.url + "/uservariables/config");
        require("start-chrome")(SRV.url + "/");

    }
})

var uri = process.env.DBURL.replace('<<user>>',process.env.DBUSER).replace('<<password>>',process.env.DBPASS);

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


process.on('uncaughtException', function(err) {
  
    // Handle the error safely
    console.log(`Terminating Process: Error
    ${err}
    `);
    process.exit();
})