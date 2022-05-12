const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
 
    roomid:{
        type: String,
        required: true,
        unique: true
    },
    title:{
       type: String
    },
    content:{
        type: String
    },
    admin:{
        type: String,
        required: true
    },
    joined:[{
        type: String,
        required: true
    }],
    updatedby:{
          type: String,
          required: true
    },
    syntax:{
        type: String,
        default: 'objectivec'
    }
},{
    timestamps: true
});

const Room=mongoose.model('Room',roomSchema);
module.exports=Room;