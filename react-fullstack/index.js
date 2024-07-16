const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const User=require("./db/user")
const Product=require("./db/product")
const jwt =require("jsonwebtoken")

require("./db/config")
const jwtkey="sonasaxena"



const app=express()

app.use(express.json());
app.use(cors());


app.post("/signup",async (req,res)=>{
    const user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password
    jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result:"something went wrong"})
        }
        res.send({result,auth:token})

    })
    
})
app.post("/login",async (req,res)=>{
    console.log(req.body)
    let user = await User.findOne(req.body).select("-password");
    if(user){
        jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.send({result:"something went wrong"})
            }
            res.send({user,auth:token});

        })
        
    }
    else{
        res.send({result:"no user found"});

    }
    
})
app.post("/add-product",verifyToken,async (req,res)=>{
    let product =new Product(req.body);
    let result=await product.save();
    res.send(result)
})
app.get("/products",verifyToken,async(req,res)=>{
    let products=await Product.find()
    if(products.length){
        res.send(products)
    }
    else{
        res.send("no product found");
    }
})
app.delete("/products/:id",verifyToken,async(req,res)=>{
    
    const result =await Product.deleteOne({_id:req.params.id})
    res.send(result)

})
app.get("/update/:id",verifyToken,async(req,res)=>{
    const id=req.params.id;
    let user = await Product.findById(id)
    if(user){
        res.send(user);

    }else{
        res.send({user:"NO RECORD FOUND"})
    }
    

})

app.put("/products/:id",verifyToken,async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
    )
    res.send(result)
})
app.get("/search/:key", verifyToken, async (req,res)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex: req.params.key}},
            {price:{$regex: req.params.key}},
            {company:{$regex: req.params.key}},
            {category:{$regex: req.params.key}},
            


            


        ]
    });
    res.send(result)
})
function verifyToken(req,res,next){
    let token =req.headers["authorization"];
    if(token){
        token=token.split(" ")[1];
        jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"Please provide valid token "})

            }else{
                next();
            }
        })

    }else{
        res.status(403).send({result:"Please add token with header "})

    }
   // console.log("middleware called")
    
}

app.listen(8000,()=>{
    console.log("app is listening at 8000")
})