const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const foodSchema = require('../modules/food')

const user = require('../modules/user');
// const Annonce = require('../models/annonce');  // schema annonce

require('dotenv').config();

// handel register
exports.register = async(req,res)=>{
try{
   const{email,password} = req.body;
   // test 3le l existance mte3 l email 
   const exist = await user.findOne({email});
   if(exist){
    return res.status(400).json({msg:"email already exist"})
   }
   // bech nabda n3amel el creation du compte
   const newUser = await new user(req.body);
   // cryptage
   const saltRounds = 10;
   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password,salt); // password hashed
   // newUser {name:'',email:'',password:'hashed password'}
   newUser.password = hash 
     newUser.save(); // enregistre l'objet fel database
     res.status(200).json({msg:'user created',newUser})

}catch(err){
    res.status(500).json({msg:'can not create this user'})
}
}





//login
exports.login= async(req,res)=>{
    try {
        const {email,password} = req.body;
        // search for email existance
        const found = await user.findOne({email});
        if(!found){
            return res.status(400).json({msg:"invalid email or password"})
        }
    
        const match = await bcrypt.compare(password,found.password);
        if(!match){
            return res.status(400).json({msg:"invalid email or password"})
        }
        // w ken el pwd ta3mel match (password === found.password)
        // na3tiw el user mte3na token 
         const payload = {id: found._id,email:found.email};
         const token = jwt.sign(payload,process.env.private_key);
         res.status(200).json({msg:"user logged In",token,found})
    } catch (error) {
      console.log(error)
        res.status(500).json({msg:"you can not log in now"})
    }
    }

    // user ya3mel rating 

    exports.rating = async (req, res) => {
        const { _id } = req.user;
        const { star, foodId  } = req.body;
        try {
          const food = await foodSchema.findById(foodId);
          let alreadyRated = food.rate.find(
            (userId) => userId.ratedBy.toString() === _id.toString()
          );
          if (alreadyRated) {
            const updateRating = await foodSchema.updateOne(
              {rate: { $elemMatch: alreadyRated }},
              {$set: { "ratings.$.star": star}},
              {new: true}
            );
            // res.json(updateRating)
          } else {
            const ratefood = await foodSchema.findByIdAndUpdate(
              foodId,
              {
                $push: {
                  rate: {
                    star: star,
                   ratedBy: _id,
                  },
                },
              },
              {new: true}
            );
            res.json(ratefood)
          }
          
          const getallratings = await foodSchema.findById(foodId);
          let totalRating = getallratings.rate.length;
          let ratingsum = getallratings.rate
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);
          let actualRating = Math.round(ratingsum / totalRating);
          let finalproduct = await foodSchema.findByIdAndUpdate(
            foodId,
            {totalRating: actualRating},
            { new: true }
          );
         return res.json(finalproduct);
        } catch (error) {
          res.status(500).json({msg:'can not rate this food '});
        }
      };