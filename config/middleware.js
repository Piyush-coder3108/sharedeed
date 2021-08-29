const jwt=require('jsonwebtoken');


module.exports.checkAuth=async (req,res,next)=>{
    
    if(req.session.username){
        return next();
    }
    if(req.cookies.jwt && req.cookies.jwt!=='none'){
        try{
        const user=await jwt.verify( req.cookies.jwt, process.env.secret_key);
        req.session.username=user.username;
        return next();
        }
        catch(err){
            res.cookie('jwt','none');
            return res.redirect('/');
        }
        
    }
    
    return res.redirect('/');
}

module.exports.checkcookie=async (req,res,next)=>{
    if(req.session.username ){
        return res.redirect(`/user/${req.session.username}`);
    }
    if(req.cookies.jwt && req.cookies.jwt!=='none'){
        try{
        const user=await jwt.verify( req.cookies.jwt, process.env.secret_key);
        req.session.username=user.username;
        return res.redirect(`/user/${req.session.username}`);
        }
        catch(err){
            res.cookie('jwt','none');
            return res.redirect('/');
        }
        
    }
    return next();
}