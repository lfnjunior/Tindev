const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            //Condição AND ou seja deve passar pelos 3 filtros, e não por apenas um como é nesse caso
            $and: [
                { _id: { $ne: user } },//Não ser igual a ele mesmo ($ne Not Equal)
                { _id: { $nin: loggedDev.likes } },//Não deu likes ($nin Not In)
                { _id: { $nin: loggedDev.dislikes } },//Não deu dislikes ($nin Not In)
            ],
        });
        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        //Verificar se usuario já existe
        const userExists = await Dev.findOne({ user: username });

        //console.log("Resultado da bisca do usuário no Banco Mongo:")
        //console.log(userExists)
        if (userExists != null) {
            //console.log("Retorna o usuário:")
            //console.log(userExists)
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)
        .catch((e)=>{
            return res.json({message : 'not found user in github'})
        });

        //console.log("Resultado da API do GitHub: ")
        //console.log(response)
        if (!response.data.name) {
            return res.json({message : 'user dont have a name'})    
        }
        if (!response.data.bio) {
            return res.json({message : 'user dont have a bio'})    
        }
        if (!response.data.avatar_url) {
            return res.json({message : 'user dont have a avatar url'})    
        }

        const { name, bio, avatar_url: avatar } = await response.data;

        
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        }).catch((e)=>{
            return res.json({message : 'can not create dev in mongodb'})    
        }); 
        //console.log(dev)
        return res.json(dev)
    }
}
//INDEX, SHOW, STORE, UPDATE, DELETE