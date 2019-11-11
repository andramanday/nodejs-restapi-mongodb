import express from 'express';

const route = express.Router();

route.post('/register', (req, res) => {
    res.send('register');
});

// route.post('/login', (req, res) => {
//     rs.send('login');
// });

module.exports = route;