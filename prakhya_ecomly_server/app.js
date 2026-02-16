
console.log('Jai Shree Ram');
const express = require('express');
const cors = require('cors');
require('dotenv/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const env = process.env;

const host =  env.HOSTNAME;
const port =  env.PORT;

app.use(bodyParser.json(

));

app.use(morgan('tiny'));
app.use(cors());




app.get('/', (req,res)=>{
    res.send('Server alive');
});

const authorization = (req,res,next)=>{
     console.log('hey authorization call');
     const isAuthorized = true;

     if(isAuthorized){
          console.log('user is Authorized');
          next();
     }else{
          res.status(401).send('UnAuthorized');
     }
};

app.get('/watch/videos/:id',authorization,(request,response)=>{
     return response.json({videoId:request.params.id});
});





app.listen(3000,'0.0.0.0',()=>{
     console.log(`server running at http://${host}:${port}`);
});



