const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(url)
        console.log("Connected to database successfully");
    } catch (err) {
        console.error(`Error connecting to database: ${err}`);
    }
}

mongoose.set('debug', true);

module.exports = connectDB