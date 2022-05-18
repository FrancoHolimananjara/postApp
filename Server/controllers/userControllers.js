const bcrypt = require('bcrypt');
var models = require('../models');
const jwtUtils = require('../utils/jwtUtils');
module.exports = {
    //REGISTER METHOD
    register : (req,res) =>{
        const body = req.body;
        
        if ((body.username==null || body.lastname==null || body.firstname==null || body.email==null || body.password==null)
        ||
        (body.username=='' || body.lastname=='' || body.firstname=='' || body.email=='' || body.password=='')) {
            return res.status(400).json('missing parameters');
        }
        models.User.findOne({
            attributes:['username','email'],
            where:{username:body.username,email:body.email}
        })
        .then((userFound)=>{
            if(!userFound){
                bcrypt.hash(body.password,10,(err,hashPassword)=>{
                    var newUser = models.User.create({
                        username:body.username,
                        lastname:body.lastname,
                        firstname:body.firstname,
                        email:body.email,
                        password:hashPassword,
                        attachment:body.attachment
                    })
                    .then((newUser)=>{
                        return res.status(201).json({'UserId' : newUser.id})
                    })
                    .catch(()=>{
                        return res.status(500).json({error:'cannot add this user'})
                    })
                })
                
            }else{
                return res.status(500).json({error:'email is already associate with an account'})
            }
        })
        .catch((err)=>{
            return res.status(500).json({error:'unable to verify this user'})
        })
    },
    //LOGIN METHOD
    login:async (req,res)=>{
        const body = req.body;
        
        if ((body.username==null || body.password==null)
        ||
        (body.username=='' || body.password=='')) {
            return res.status(400).json('missing parameters');
        }

        await models.User.findOne({
            where:{username:body.username}
        })
        .then((userFound)=>{
            if (userFound){
                bcrypt.compare(body.password,userFound.password,function(errBcrypt,resBcrypt) {
                    if (resBcrypt) {
                        return res.status(200).json({
                            'UserId':userFound.id,
                            'Token':jwtUtils.generateTokenForUser(userFound)
                        });
                    }else{
                        return res.status(403).json({'error':'invalid password'});
                    }
                })
            }
            else{
                return res.status(403).json({error:'user does not exist'})
            }
        })
        .catch((err)=>{
            return res.status(500).json({'error':'unable to verify user'});
        })
    },
    //GET USER PROFILE
    UserProfile:async(req,res)=>{
        const UserId=req.UserId;
        await models.User.findOne({
            attributes:{exclude:['password','createdAt','updatedAt']},
            where:{id:UserId}
        })
        .then((userFound)=>{
            if (!userFound){
                return res.status(403).json({error:'user not found'})
            }
            else{
                return res.status(200).json(userFound);
            }
        })
        .catch((err)=>{
            return res.status(500).json({'error':'unable to verify user'});
        })
    }

}