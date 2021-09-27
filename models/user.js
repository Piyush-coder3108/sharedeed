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
    ],
    editor:{
        theme:{
            type: String,
            default: 'dracula'
        },
        tabsize:{
            type: Number,
            default: 2
        },
        fontsize:{
            type: Number,
            default: 12
        }
    }
},{
    timestamps: true
});

const User=mongoose.model('User',userSchema);

module.exports=User;

