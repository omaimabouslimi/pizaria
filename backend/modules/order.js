const mongoose = require ("mongoose")
const OrderSchema = new mongoose.Schema({
 id : {type:String , require:true},
 name: {type:String , require:true},
 quantite:{type:Number , require:true},
 adress:{type:String , require:true},

})