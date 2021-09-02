const express = require('express')
const router = require('./routes/services')
const conn = require('./config/connection')
const app = express()
const bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(express.json())
const port = 4949

app.use('/api',router)


app.listen(port,() => console.log(`listening on ${port}`))