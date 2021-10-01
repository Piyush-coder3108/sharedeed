const ShortUniqueueId=require('short-unique-id');
const Room=require('../models/room');
const User=require('../models/user');




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
                title:'',
                content: '',
                admin: req.session.username,
                joined:[],
                updatedby: req.session.username
            });
            new_room.save();
            User.findOne({username:req.session.username})
            .then(user=>{
                // console.log(user);
                if(user){
                    user.rooms.push(new_room._id);
                }
                user.save();
                return res.redirect(`/editor/${newroom}`);
            })
            .catch(err=>console.log(err));
            
            
            
        } 

    })
    .catch(err=>{
        console.log(err);
        return res.redirect('/');
    })
    
};



// Gettting Room Data
module.exports.retrieve_data=(req,res)=>{
    const { roomid }=req.params;
    if(roomid.length!==10){
        return res.redirect('/');
    }
    
    Room.findOne({roomid})
    .then(room=>{
        // console.log(room);
        if(room){
            var x= (room.admin===req.session.username)? true: false;
            User.findOne({username: req.session.username})
            .then(user=>{
                res.status(200).render('editor',{
                    roomid: room.roomid,
                    title: room.title,
                    codecontent: room.content,
                    admin: x,
                    username: req.session.username,
                    themes: require('../config/theme')  ,
                    theme: user.editor.theme,
                    tabsize: user.editor.tabsize,
                    fontsize: user.editor.fontsize,
                    roomusers: room.joined
                });
            })
            .catch(err=>{
                console.log(err);
                res.status(200).render('editor',{
                    roomid: room.roomid,
                    codecontent: room.content,
                    admin: x,
                    username: req.session.username,
                    theme: 'dracula',
                    tabsize: 2,
                    fontsize: 12
                });
            })

            
        }
        else{
            // Sorry we are not recognising your room so we are creating new room
            console.log("creating new room");
            return res.redirect('/create/newroom');
        }
    })
    .catch(err=>{
        return res.redirect('/');
    });
}

// Saving room data
 module.exports.save_data=async (req,res)=>{
     const {title, content, user}=req.body;
     try{
     const room=await Room.findOne({roomid: req.params.roomid});
     if(room){
        room.title=title;
        room.content=content;
        room.updatedby=user;
        room.save();
        return res.json({success: true});
     }
    }catch(err){
        return res.json({success: false});
    }

     
 }