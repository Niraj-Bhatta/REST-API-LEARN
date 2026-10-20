const uploadFile = async(req , res, next) =>{
    try{
        res.json({msg :"ok:true"});

    }catch(error){
        next(error)
    }
}

module.exports = uploadFile;