const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //Usuario usando o sistema
        console.log(req.headers.user);
        //Da like no usuario:
        console.log(req.params.devId);
        //Usado headers nesse caso, porem headers geralmente é usado para autenticação (TOKEN)

        const { devId } = req.params;
        const { user } = req.headers;
 
        const loggedDev = await Dev.findById(user);
        const targetDEv = await Dev.findById(devId);

        if(!targetDEv){
            return res.status(400).json({error: 'Dev not exists!'})
        }

        loggedDev.dislikes.push(targetDEv._id);

        await loggedDev.save();

        return res.json(loggedDev.dislikes)

    }
};