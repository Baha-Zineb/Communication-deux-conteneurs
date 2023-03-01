const express = require ('express')
const path = require('path');
const process = require("process");
const redis = require("redis");
const app = express();
const port = process.env.port || 5050

//get info from cont2
const client = redis.createClient({
  host: "redis-server",
  ports: 6379
});
client.set("visits",0);


app.get('/', (req, res) => {
  client.get("visits",(err,visits) => {
    res.send("le nombre de visites" + visits);
    client.set("visits",parseInt(visits)+1);
  })
  });

app.listen(port,() => console.log('server ready'))