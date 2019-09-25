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
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev não encontrado!'})
        }

        //Antes verifica Match
        if (targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];
            //Verificar se estão com a aplicação aberta
            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match',targetDev)
            }    
            if (targetSocket) {
                req.io.to(targetSocket).emit('match',loggedDev)
            }    
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev.likes)

    }
};