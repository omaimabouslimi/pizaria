const mongoose = require ("mongoose")
const foodSchema = new mongoose.Schema({
   
    name: {type:string , required:true},
    description :{type:String , required:true},
    image : {type:String , required:true},
    price:{type: Number,
        required:true},    
    rate : [{
        star : Number ,
        ratedBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'  //nom du model
        }
    }],
    totalRating : {type :Number,default:0 } })
module.exports = mongoose.module("Pizaria",foodSchema)