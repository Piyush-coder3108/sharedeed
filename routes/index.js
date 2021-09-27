const express=require('express');
const ShortUniqueueId=require('short-unique-id');

const { login, register, logout, change_editor_setting }=require('../controllers/user_controller');
const { checkAuth, checkcookie } =require('../config/middleware');
const { create_room, retrieve_data , save_data} =require('../controllers/room_controller');


const Router=express.Router();

Router.get('/', checkcookie ,(req,res)=>{
    res.status(200).render('index');
});


// Auth Routes

Router.post('/login',login);

Router.post('/register',register);

Router.get('/logout',logout);


// Room Routes

Router.get('/create/newroom',checkAuth,create_room);

Router.get('/editor/:roomid',checkAuth,retrieve_data);

Router.post('/editor/:roomid/data',checkAuth,save_data);


// User Routes

Router.get('/user/:username',(req,res)=>{
    res.render('profile');
});

Router.post('/change/editor/setting',checkAuth,change_editor_setting);


module.exports=Router;