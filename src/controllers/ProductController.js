import Product from '../models/ProductModel'


export default class ProductController {

    static async insertProduct(req, res) {
        try {
            const product = new Product(req.body)
            await product.save()
            res.status(201).send(product)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async getAll(req, res) {
        try {
            const product = await Product.find()            
            res.status(201).send({ product })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async deleteBy(req, res) {
        const { userId } = req.params
        try {
            const product = await Product.deleteOne({ _id: userId })            
            res.status(201).send({ product })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const product = await Product.findByCredentials(email, password)
            if (!product) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await product.generateAuthToken()
            res.send({ product, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async logout(req, res) {
        // Log product out of the application
        try {
            res.status(200).send({"msg": "Logout berhasil"})
            req.product.tokens = req.product.tokens.filter((token) => {
                return token.token != req.token
            })
            // res.send()
            await req.product.save()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static async logoutAll(req, res) {
        // Log product out of the application
        try {
            req.product.tokens.splice(0, req.product.tokens.length)
            await req.product.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }
}