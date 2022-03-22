const express = require('express');
const ewelink = require('ewelink-api');

const app = express();
app.use(express.text());
app.use(express.json());
app.use(express.raw());

const connection = new ewelink({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    region: 'eu',
  });
 
//READ Request Handlers
app.get('/', (req, res) => {
  res.send('Welcome to EWE REST API with Node.js');
});

app.get('/api/lights', async (req, res) => {
  try{
    const devices = await connection.getDevices();
    const names = devices.map(c => c.name.trim().toLowerCase())
    res.send(names)
  }catch(error) {
    console.log(error)
  }
});
 
app.get('/api/lights/:id', async (req, res) => {
  try{
    console.log('GET' + ' ' + req.params.id)
    const devices = await connection.getDevices();
    const device = await devices.find(c => c.name.trim().toLowerCase() === req.params.id);
    console.log('RESPONSE' + ' ' + req.params.id + '=' + device.params.switch)
    res.send(device.params.switch)
  }catch(error){
    console.log(error)
  }
});

//CREATE Request Handler
app.post('/api/lights/:id', async (req, res)=> {
  try{
    const devices = await connection.getDevices();
    const device = devices.find(c => c.name.trim().toLowerCase() === req.params.id);
    console.log('POST' + ' ' + req.params.id + ' ' + req.body)
    r = await connection.setDevicePowerState(device.deviceid, req.body.toLowerCase())
    console.log(r) 
    res.send(r);
  }catch(error){
    console.log(error)
  }
});


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
