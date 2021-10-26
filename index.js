const express = require('express');
const app = express();
const port = 8002;

app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${error} `);
    }

    console.log(`Server is up and running on port: ${port}`);
});