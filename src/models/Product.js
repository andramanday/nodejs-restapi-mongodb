const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    kodeBrg: {
        type: String,
        require: true,
        unique: true
    },
    namaBrg: {
        type: String,
        require: true
    },
    hargaBrg: {
        type: String,
        require: true
    }
})


const products = mongoose.model('Products', ProductSchema);

module.exports = products