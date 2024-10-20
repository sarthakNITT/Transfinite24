const mongoose = require('mongoose');

const openseaSchema = new mongoose.Schema({
    total: {
        volume: { type: Number, default: 0 },
        sales: { type: Number, default: 0 },
        average_price: { type: Number, default: 0 },
        num_owners: { type: Number, default: 0 },
        market_cap: { type: Number, default: 0 },
        floor_price: { type: Number, default: 0 },
        floor_price_symbol: { type: String, default: "string" }
    },
    intervals: [
        {
            interval: { type: String, default: "one_day" },
            volume: { type: Number, default: 0 },
            volume_diff: { type: Number, default: 0 },
            volume_change: { type: Number, default: 0 },
            sales: { type: Number, default: 0 },
            sales_diff: { type: Number, default: 0 },
            average_price: { type: Number, default: 0 }
        }
    ]
});

module.exports = mongoose.model('Opensea', openseaSchema);
