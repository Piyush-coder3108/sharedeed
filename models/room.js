const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
 
    roomid:{
        type: String,
        required: true,
        unique: true
    },
    content:{
        type: String
    },
    admin:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Room=mongoose.model('Room',roomSchema);
module.exports=Room;