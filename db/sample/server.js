const express =require("express");
const mongoose=require("mongoose")
const cors=require("cors");


const app=express();
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/prdb")
.then(()=>console.log("MongoDb Connected"))
.catch((err)=>console.log("error"));


const prschema=new mongoose.Schema({
    name:String,
    quantity:Number
})

const Product=mongoose.model("Product",prschema);



app.get("/products" ,async(req, res) => {
        const products = await Product.find();
        res.json(products);

    });
    app.post("/products" ,async(req, res) => {
        const product=new Product(req.body);
        await product.save();
        res.json(product);
    });

    app.put("/products/:id" ,async(req, res) =>
    {
        await Product.findByIdAndUpdate(req.params.id,req.body)
        res.json({message:"updated"});

    });
    app.delete("/products/:id", async (req, res) => {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "deleted" });
    });

    app.listen(3001, () => console.log("running on http://localhost:3001"));