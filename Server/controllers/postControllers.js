var models = require('../models');
module.exports = {
    fetchAll : async (req,res) =>{
            await models.Post.findAll({
            })
            .then((posts)=>{
                if(posts.length>0){
                    console.log(req.isLoggedIn,req.UserId);
                    return res.status(200).json(posts)
                }else{
                    return res.status(404).json({error:'data post is empty'})
                }
            })
            .catch(err=>{
                return res.json(err)    
            });
    },
    //ADD NEW POST
    add : async (req,res)=>{
        const body = req.body;
        const UserId = req.UserId;
        if (( body.title==null || body.content==null)
        ||
        (body.title=='' || body.content=='')) {
            return res.status(400).json({error:'missing parameters'});
        }
        
        await models.Post.findOne({
            where:{title:body.title}
        })
        .then((posts)=>{
            if(!posts){
                var newPost = models.Post.create({
                    UserId:UserId,
                    title:body.title,
                    content:body.content
                })
                .then((newPost)=>{
                    return res.status(201).json({message:'Post ajouté!'})
                })
                .catch(()=>{
                    return res.status(500).json({error:'cannot add new post'})
                });
            }else{
                return res.status(404).json({error:'post is already exist'})
            }
        })
        .catch(err=>{
            return res.json(err)
        });
    },
    //GET ALL POST ASSOCIATE WITH AN USER
    fetchPostWithUserId: async (req,res) =>{
        var UserId = req.UserId;
        await models.Post.findAll({
            where:{UserId:UserId}
        })
        .then((posts)=>{
            if(posts.length>0){
                return res.status(200).json(posts)
            }else{
                return res.status(404).json({error:'data post is empty'})
            }
        })
        .catch(err=>{
            return res.json(err)
        });
    },
   //DELETE ONE POST ASSOCIATE WITH AN USER
    DeletePostWithUserId: async (req,res) =>{
        var UserId = req.UserId
        const idPost = req.params.id;
        await models.Post.findOne({
            where:{UserId:UserId}
        })
        .then((posts)=>{
            if(posts){
                models.Post.destroy({
                    where:{id:idPost}
                })
                .then((postDelete)=>{
                    if (postDelete) {
                        return res.status(200).json({message:'Post deleted!'})
                    }else{
                        return res.status(404).json({error:'post can\'t be deleted'})
                    }
                })
                .catch(err=>{
                    return res.json(err)
                });
            }else{
                return res.status(404).json({error:'post not exist'})
            }
        })
        .catch(err=>{
            return res.json(err)
        });
    },
    //UPDATE ONE POST ASSOCIATE WITH AN USER
    UpdatePostWithUserId: async (req,res) =>{
        var UserId = req.UserId;
        const idPost = req.params.id;
        const body = req.body;
        var newPost = {
            UserId:UserId,
            title:body.title,
            content:body.content,
            image:body.image,
        }
        await models.Post.findOne({
            where:{UserId:UserId}
        })
        .then((posts)=>{
            if(posts){
                models.Post.update(newPost,{
                    where:{id:idPost}
                })
                .then((postUpdated)=>{
                    if (postUpdated) {
                        return res.status(200).json({message:'Post Updated!'})
                    }else{
                        return res.status(404).json({error:'post can\'t be updated'})
                    }
                })
                .catch(err=>{
                    return res.json(err)
                });
            }else{
                return res.status(404).json({error:'post not exist'})
            }
        })
        .catch(err=>{
            return res.json(err)
        });
    }
}