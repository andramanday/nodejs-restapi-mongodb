import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    kode_brg: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nama_brg: {
        type: String,
        required: true
    },
    stok_brg: {
        type: Number,
        required: true,
        default: 0
    },
    harga_brg: {
        type: mongoose.Decimal128,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product