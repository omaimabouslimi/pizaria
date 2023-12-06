const mongoose = require ("mongoose")
const connect = async ()=>{ 
   


  try {
    await mongoose.connect("mongodb+srv://ouerghiomaima1:meVn5h5fXSVqtSHo@cluster0.ord43ni.mongodb.net/ food" )
    console.log("data connecter")
  } catch (error) {
    console.log(err)
  }
}
module.exports = connect;