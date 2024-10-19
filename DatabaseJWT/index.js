const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./src/Database/dbconfig')
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/auth');
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser());

connectDB();

app.use('/auth', authRoutes);

app.get('/', (req,res)=>{
    res.status(200).send("Hello")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})