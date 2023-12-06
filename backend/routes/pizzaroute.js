const express = require ("express");
const foodSchema = require("../modules/food")
const foodRouter = express.Router()

foodRouter.post('/create',(req,res)=>{
    const {title,authors,description,date,price,rate}=req.body;
    const newfood = new foodSchema({title,authors,description,date,price,rate});
    newfood.save()
    .then((rslt)=>{
        res.status(200).json({msg : "food create",rslt})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({msg : 'error'})
    })
})
//get all food 
foodRouter.get('/get',(req,res)=>{
    foodSchema.find({})
    .then((rslt)=>{
        res.status(200).json({msg : "total food list ",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
})


//get food by Id 
foodRouter.get('/get/:id',(req,res)=>{
    const {id}=req.params;
    foodSchema.findById({_id:id})
    .then((rslt)=>{
        res.status(200).json({msg : "food selected with success",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
})

//upDate food by id 
foodRouter.put('/upDatefood/:id',(req,res)=>{
   const {id}=req.params ;
   const {name,description,price,rate}=req.body;
   
    foodSchema.findByIdAndUpdate({_id:id},{name,description,price,rate})
    .then((rslt)=>{
        res.status(200).json({msg : "food upDate",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
}
)


//delete food  by id 
foodRouter.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    foodSchema.deleteOne({_id:id})
    .then((rslt)=>{
        res.status(200).json({msg : "food delete with success",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
})



// rating 
foodRouter.get('/rate/:id',(req,res)=>{
    const {id}=req.params;
    foodSchema.findById()
    .then((rslt)=>{
        res.status(200).json({msg : "",rslt})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({msg : 'error'})
    })

})


module.exports = foodRouter