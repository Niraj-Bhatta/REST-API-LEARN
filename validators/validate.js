
//collects the error produced by your validation rules.
const {validationResult} =require("express-validator");

const validate =(req,res,next)=>{
const errors = validationResult(req); //retrive the error caused from the signup-validation


const mappedErrors={}

if(Object.keys(errors.errors).length ===0){
    next()
}else{
    errors.errors.map((error)=>{
        mappedErrors[error.path]=error.msg
    })
    res.status(400).json(mappedErrors)
}
}

module.exports = {validate};