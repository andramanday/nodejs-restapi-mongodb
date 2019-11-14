import User from '../models/UserModel'


export default class UserController {
    static async signUp(req, res) {
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async getAll(req, res) {
        try {
            const user = await User.find()            
            res.status(201).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    
    static async getById(req, res) {
        const { userId } = req.params
        try {
            const user = await User.findOne({ _id: userId })            
            res.status(201).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async deleteBy(req, res) {
        const { userId } = req.params
        try {
            const user = await User.deleteOne({ _id: userId })            
            res.status(201).send({ user })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async logout(req, res) {
        // Log user out of the application
        try {
            res.status(200).send({"msg": "Logout berhasil"})
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            // res.send()
            await req.user.save()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static async logoutAll(req, res) {
        // Log user out of the application
        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    /**
     * Controller For KTP
     */

    //GET KTP DATA
    static async getKTP(req, res) {
        const { userId } = req.params
        try {
            const product = await Product.find()            
            res.status(201).send(product)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    //INSERT KTP
    static async InsertKTP(req, res) {

        const { userId } = req.params
        try {
            const user = await User.findOne({ _id: userId }) 
            if(user.ktp[0]){
                const ktpId = user.ktp[0]._id
                User.update(
                    { 'ktp._id': ktpId },
                    { 
                        $set: {
                            "ktp": req.body
                        }
                    },
                    {  safe: true, upsert: true},
                    function(err, model) {
                        if(err){
                            console.log(err);
                            return res.send(err);
                        }
                        return res.json(model);
                    }
                );
            }else{
                user.ktp = user.ktp.concat(req.body)
                await user.save()
                res.status(201).send({msg: 'Insert Success', user})
            }      
        } catch (error) {
            res.status(400).send(error)
            res.send(item);
        }
    }
}