const ShortUniqueueId=require('short-unique-id');
const Room=require('../models/room');




module.exports.create_room=(req,res)=>{
    
    
    // creating room in our database
    const uid=new ShortUniqueueId({length: 10});
    const newroom=uid();
    Room.findOne({roomid:newroom})
    .then(room=>{
        if(room){
            return res.redirect('/create/newroom');
        } 
        else{
            const new_room=new Room({
                roomid: newroom,
                content: '',
                admin: req.session.username
            });
            new_room.save();
            return res.redirect(`/editor/${newroom}`);
            
        } 

    })
    .catch(err=>{
        console.log(err);
        return res.redirect('/');
    })
    
};


module.exports.retrieve_data=(req,res)=>{
    const { roomid }=req.params;
    if(roomid.length!==10){
        return res.redirect('/');
    }
    
    Room.findOne({roomid})
    .then(room=>{
        if(room){
            var x= (room.admin===req.session.username)? true: false;
            res.status(200).render('editor',{
                roomid: room.roomid,
                codecontent: room.content,
                admin: x,
                username: req.session.username
            });
        }
        else{
            // Sorry we are not recognising your room so we are creating new room
            return res.redirect('/create/newroom');
        }
    })
    .catch(err=>{
        return res.redirect('/');
    });

    
}