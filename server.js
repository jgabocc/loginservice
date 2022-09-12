const app = require('./app');
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

require('./config/db').dbConnect();

const port = process.env.PORT || 3000;

const server = app.listen(
    port, 
    console.log(`Server listening on port: ${port}. 
On ${process.env.NODE_ENV}`
    ));