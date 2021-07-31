const express=require('express');




const app=express();

const PORT=process.env.PORT || 3000;


app.use('/', require('./routes'));


app.listen(PORT,(err)=>{
  if(err){
      console.log(err);
  }
  else{
      console.log(`Server running at PORT: ${PORT}`);
  }
})