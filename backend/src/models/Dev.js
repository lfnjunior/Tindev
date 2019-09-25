const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: { type: String, 
            required : true 
        },
    user: { type: String, 
            required : true 
        },
    bio: String,
    avatar: {type: String, 
             required : true 
            },
    likes: [{//forma de relacionamento
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    timestamps : true
})

module.exports = new model('Dev', DevSchema);