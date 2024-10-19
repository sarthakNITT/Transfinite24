const express = require("express");
const app = express();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const yourOpenSeaApiKey = "1f11bd81697f49f9bbbe090dec0afff2";

app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.json());
 

app.get("/", async function (req, res) {
    const numberOfAssets = Math.floor(Math.random() * 10) + 1;

    try {
        const apiUrl = `https://api.opensea.io/api/v1/assets?limit=${numberOfAssets}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.get("/search", async function (req, res) {
    const search = req.query.search;

    if (!search) {
        return res.status(400).send({ error: "Search term not found" });
    }
    try {
        const api_url = `https://api.opensea.io/api/v1/assets?search=${search}`;
        const result = await axios.get(api_url);
        const response = result.data;

        res.status(200).send(response); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.post("/sell", async function (req, res) {
    const { assetId, price, quantity } = req.body;

    if (!assetId || !price || !quantity) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const apiUrl = `https://api.opensea.io/api/v1/assets/${assetId}/orders`;
        const response = await axios.post(apiUrl, {
            side: "sell",
            base_price: price,
            quantity: quantity,
        }, {
            headers: {
                "Authorization": `Bearer ${yourOpenSeaApiKey}`
            }
        });

        res.status(200).send(response.data); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.post("/buy", async function (req, res) {
    const { assetId, price, quantity } = req.body;

    if (!assetId || !price || !quantity) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const apiUrl = `https://api.opensea.io/api/v1/assets/${assetId}/orders`;
        const response = await axios.post(apiUrl, {
            side: "buy",
            base_price: price,
            quantity: quantity,
        }, {
            headers: {
                "Authorization": `Bearer ${yourOpenSeaApiKey}`
            }
        });

        res.status(200).send(response.data); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.post("/create", async function (req, res) {
    const { name, description, image } = req.body;

    if (!name || !description || !image) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const apiUrl = `https://api.opensea.io/api/v1/assets`;
        const response = await axios.post(apiUrl, {
            name: name,
            description: description,
            image: image,
        }, {
            headers: {
                "Authorization": `Bearer ${yourOpenSeaApiKey}`
            }
        });

        res.status(200).send(response.data); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.listen(3000,function(req,res){
     console.log("running")
})


