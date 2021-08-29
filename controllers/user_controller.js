const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


module.exports.login= async (req,res)=>{
    const {username,password}=req.body;

    User.findOne({username: username})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,ismatch)=>{
                if(err) { console.log(err)}
                if(ismatch) { 
                const token=jwt.sign({username: username},process.env.secret_key);
                req.session.username=username;
                res.cookie('jwt',token);
                return res.redirect(`/user/${username}`);
                }
                else{
                    return res.redirect('/');
                }
            })
            
        }
        else{
            return res.redirect('/');
        }
    })
    .catch(err=>{
        console.log(err);
        return res.redirect('/');
    })


}

module.exports.register=async (req,res)=>{
    const {username,name,password}= req.body;
    User.findOne({username: username})
    .then((user)=>{
        if(user){
            // req.flash('error','You are already registered , Please login !!!!');
            res.redirect('/');
        }
        else{
            const newUser= new User({
                username: username,
                password: password,
                name: name
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(password,salt,(error,hash)=>{
                    if(error){ console.log(error);
                        // req.flash('error','Server Error, Please Try again after sometime!!!!');
                        res.redirect('/');
            
                    }
                    else{
                        newUser.password=hash;
                        newUser.save();
                    }
                })
            });
             const token=jwt.sign({username: username},process.env.secret_key);
             res.session.username=username;
             res.cookie('jwt',token);
            // req.flash('success','You are now registered , Please login !!!!');
            return res.redirect(`/user/${username}`);
        }

        
    })
    .catch(err=>{
        console.log(err);
        // req.flash('error','Server Error Please try again after sometime !!!!');
        return res.redirect('/');
    });
    

};


module.exports.logout=(req,res)=>{
    req.session.destroy();
    res.cookie('jwt','none');
    res.redirect('/');
}