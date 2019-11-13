const auth = require('../middleware/auth')
import User from '../controllers/UserController';
import Product from '../controllers/ProductController';
import SeedProduct from '../seed';


export default (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Restfull-API!',
    }));

    app.post('/api/users', User.signUp);
    app.get('/api/users', auth, User.getAll); // API route for user to signup
    app.delete('/api/users/:userId', auth, User.deleteBy); // API route for user to signup
    app.post('/api/users/login', User.login); // API route for user to signup
    app.post('/api/users/logout', auth, User.logout); // API route for user to 
    app.post('/api/users/logoutall', auth, User.logoutAll); // API route for user to Logout all active account

    app.post('/seed/products', SeedProduct); // API route for user to Logout all active account

    //ROUTE FOR PRODUCT
    // app.post('/api/product', auth, Product.insertProduct); // API route for product insert barang
    // app.get('/api/product', auth, Product.getProducts); // API route for product insert barang
    // app.get('/api/product/:id', auth, Product.getProductById); // API route for product insert barang

}