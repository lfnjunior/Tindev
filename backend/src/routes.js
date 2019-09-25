//Por motivos de refatoração, as rotas foram separadas do arquivo de servidor
//Para deixar mais organizado
const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router();

// Metodos criados inicialmente para teste
// routes.get('/', (req, res) => {
//     return res.send({message : `ah mano ${req.query.name} ?`});
// });

// routes.post('/devs',(req,res) => {
//     console.log(req.body);//corpo da requisição
//     return res.json({resposta : "toma", falaagora : req.body});
// })

routes.get('/devs',  DevController.index);
routes.post('/devs',  DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;