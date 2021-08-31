const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const itemModel = require("./models/items");

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://user1:12345@cluster0.7bcd1.mongodb.net/two?retryWrites=true&w=majority',{
    useNewUrlParser:true,
});

const ObjectId = require("mongodb").ObjectId;

app.post("/insert",async(req, res) =>{

    const Iname= req.body.Ino;
    const des= req.body.Description;
    const price= req.body.Price;
    const quantity= req.body.Quantity;
    
    const newItem = itemModel.updateOne(
        {"Ino": Iname},
        { $setOnInsert: {Ino:Iname, Description:des, Price:price, Quantity:quantity} },
        { upsert: true }
     ).exec();
     try{
        await newItem.save();
        res.send("saved sucessfully");
    }
    catch(err){console.log("err");}
} )


app.get("/readAll",async(req, res) =>{

    itemModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
} )

app.get("/read/:id",async(req, res) =>{
    const obId = req.params.id;
    itemModel.findById({'_id': new ObjectId(obId)},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
} )


app.delete("/delete/:id", async(req,res)=>{
   const id = req.params.id;
   await itemModel.findByIdAndDelete(id).exec();
   res.send("item deleted");
});

app.put("/update/:id",async(req, res) =>{
    const id = req.params.id;
    const des= req.body.Description;
    const price= req.body.Price;
    const quantity= req.body.Quantity;

    const upItem = itemModel.findByIdAndUpdate({'_id': new ObjectId(id)},{"$set":{Description:des, Price:price, Quantity:quantity}}).exec()
    try{
        await upUser.save();
        res.send("hi");
    }
    catch(err){console.log("err");}
} )

  

app.listen(3001,()=>{
    console.log("server is running on port 3001");
})