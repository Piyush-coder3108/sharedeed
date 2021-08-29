const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    rooms:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ]
},{
    timestamps: true
});

const User=mongoose.model('User',userSchema);

module.exports=User;

