const express = require('express');
const { static } = express;
const path = require('path');
const axios = require("axios")

const app = express();

app.use('/dist', static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', async(req, res, next)=> {
  try {
    const data = (await axios.get('https://data.cityofnewyork.us/resource/hc8x-tcnd.json?$limit=10')).data
    // console.log(data)
    res.send(data);
  }
  catch(ex){
    next(ex);
  }
});

const init = async()=> {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};


init();