const express=require('express');
const session=require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app=express();
const server=require("http").Server(app);
const io=require("socket.io")(server);
const Room=require('./models/room');
const cors=require('cors');
// const { ExpressPeerServer }=require('peer');
// const peerServer=ExpressPeerServer(server,{
//   debug: true
// });

require('./config/db')();

//cors
app.use(cors());

// cookie middleware
app.use(cookieParser());

app.use(session({
  secret: 'keyboardcat'
}));

// Setting body-parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());




// Serving static files
const static_path=__dirname+'/public';
app.use(express.static(static_path));

// Setting view engine
app.set('view engine','ejs');



app.use('/', require('./routes'));



// Socket Connection

io.on("connection",(socket)=>{
   
  socket.on("join-room",({roomid,username})=>{
    socket.join(roomid);
    socket.room=roomid;
    socket.nickname=username;
    socket.in(roomid).emit("new-user",username);
    Room.findOne({roomid})
    .then(roomdata=>{
      // console.log(roomdata);
      var found=false;
      for(var i=0;i<roomdata.joined.length;i++){
        if(roomdata.joined[i]==username){
          found=true;
        }
      }
      if(!found){
        roomdata.joined.push(username);
      }
      roomdata.save();
      io.in(roomid).emit('users-list',roomdata.joined);
      // socket.to(socket.id).emit('users-list',roomdata.joined);
    })
    .catch(err=>{
      console.log(err);
    })
    
  
    socket.on('code-change',({code,roomid})=>{
        socket.in(roomid).emit('code',code);
    })
    socket.on('changed-title',({title,roomid})=>{
        socket.in(roomid).emit('title-change',title);
    });
  
    socket.on('changed-mode',({syntax,roomid} )=>{
       socket.in(roomid).emit('mode-change',syntax);
    });
  
    socket.on('send',({message,roomid,username})=>{
        socket.in(roomid).emit('receive',{ data:message ,user: username  })
    });

    socket.on('disconnect',()=>{
      Room.findOne({roomid})
    .then(roomdata=>{
      // console.log(roomdata);
      var index=roomdata.joined.indexOf(username);
      if(index>-1){
        roomdata.joined.splice(index,1);
      }
      roomdata.save();
      socket.to(roomid).emit('users-list',roomdata.joined);
    })
    .catch(err=>{
      console.log(err);
    })
    })
    

  });

  


})






const PORT=process.env.PORT || 3000;

server.listen(PORT,(err)=>{
  if(err){
      console.log(err);
  }
  else{
      console.log(`Server running at PORT: ${PORT}`);
  }
})