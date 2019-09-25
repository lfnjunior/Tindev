const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes'); 

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {} 

io.on('connection', socket => {
    const {user} = socket.handshake.query;
    connectedUsers[user] = socket.id;
})

//GET    consultar
//POST   incluir 
//PUT    editar
//DELETE excluir
// server.get('/', (req, res) => {
//     console.log(req);
//     return res.send({message : `E ai ${req.query.name} ?`});
// });
mongoose.connect(`mongodb://35.247.198.63/tindev`,{ useNewUrlParser : true });
//mongoose.connect(`mongodb://localhost/tindev`,{ useNewUrlParser : true });
app.use((req,res,next) => {
    req.io = io;
    req.connectedUsers = connectedUsers; 

    return next(); 
});

app.use(cors());
app.use(express.json()); 
app.use(routes); 
server.listen(3000);  
   

//M - Model        Abstração da estrutura do banco de dados
//V - View         Front End (Não será utilizado nesse caso)
//C - Controler    
 
 
