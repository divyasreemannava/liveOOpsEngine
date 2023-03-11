const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    image: String,
    sort_order: Number,
    content: Array,
    schedule: Object,
    target: String,
    pricing: Array,
    username: String
});
const Offer = mongoose.model("offer", offerSchema);
module.exports = Offer