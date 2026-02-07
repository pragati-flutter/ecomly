console.log('Hello world!!!!!');
console.log('Jai Shree Ram');
const express = require('express');
const app = express();
const host =  '0.0.0.0';
const port =  3000;

app.listen(3000,'0.0.0.0',()=>{
     console.log(`server running at http://${host}:${port}`);
});


