require('dotenv').config();
require('./config/database.js');

const  app =  require('./app.js');

app.listen(process.env.PORT, ()=> 
{
    console.log("server is running");
});