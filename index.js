const express=require("express");
const mongoose=require("mongoose");
const ejs= require("ejs");

const app=express();
   
//connect mongodb
mongoose.connect("mongodb://localhost:27017/api_web_tech_assignment",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("MongoDB Connected..."))
.catch(err=>console.log(err));


//create schema
const orderSchema=new mongoose.Schema(
    {
        customer_id:{
            type:String,
            requried:true
        },
        inventory_id:{
            type:String,
            requried:true
        },
        item_name:{
            type:String,
            requried:true
        },
        quantity:{
            type:Number,
            requried:true
        }
    }
);
const inventorySchema=new mongoose.Schema({
    inventory_id:{
        type:String,
        requried:true
    },
    inventory_type:{
        type:String,
        requried:true
    },
    item_name:{
        type:String,
        requried:true
    },
    available_quantity:{
        type:Number,
        requried:true
    },
});

const customerSchema=new mongoose.Schema({
    customer_id:{
        type:String,
        requried:true
    },
    customer_name:{
        type:String,
        requried:true
     },
     email:{
        type:String,
        requried:true
     }
});

//create Models 
const Order=mongoose.model("Order",orderSchema);
const  Inventory= mongoose.model("Inventory",inventorySchema);
const  Customer= mongoose.model("Customer",customerSchema);


// set view engine 
app.set("view engine",'ejs');

//create route //create Orders
app.post('/createOrders',(req,res)=>{
    const order=new Order({
        customer_id:req.body.customer_id,
        inventory_id:req.body.inventory_id,
        item_name:req.body.item_name,
        quantity:req.body.quantity
    })
    order.save()
    .then(order=>res.json(order))
    .catch(err=>res.status(400).json("Error:" + err));
});


//create inventory
app.post("/createInventroy",(req,res)=>{
    const inventory=new inventory({
        inventory_id:req.body.inventory_id,
        inventory_type:req.body.inventory_type,
        item_name:req.body.item_name,
        available_quantity:req.body.available_quantity
    });

    inventory.save()
    .then(inventory=>res.json(inventory))
    .catch(err=>res.status(400).json("Error:" + err));
});


//create Customer
app.post("/createCustomer",(req,res)=>{
    const customer_id=new Customer({
        customer_id:req.body.customer_id,
        customer_name:req.body.customer_name,
        email:req.body.email
    });
    customerSchema.save()
    .then(customer=>res.json(customer))
    .catch(err=>res.status(400).json("Error:",+ err))
})


//get All order
app.get("/orders",(req,res)=>{
    Order.find()
    .then(orders=>res.json(order))
    .catch(err=>res.status(400).json("Error:" + err))
})


//get all inventory
app.get("/inventory",(req,res)=>{
    Inventory.find()
    .then(inventories=>res.json(inventories))
    .catch(err=>res.status(400).json("Error:" + err))
})

//get all Customer
app.get("/customerDetails",(req,res)=>{
    Customer.find()
    .then(customers=>res.json(customers))
    .catch(err=>res.status(400).json("Error:" + err))
})

//get inventory by type
app.get("/inventory/inventoryType",(req,res)=>{
    Inventory.find({inventory_type:req.params.inventory_type})
    .then(inventories=>res.json(inventories))
    .catch(err=>res.status(400).json("Error:" + err));
})

//get available quantity
app.get("/itemName/availableQuantity",(req,res)=>{
    Inventory.findOne({item_name:req.params.item_name})
    .then(inventory=>{
        if(inventory.available_quantity===0){
            res.json("ITEM IS OUT OF STOCK")
        }else{
            res.json(inventory.available_quantity);
        }
    })
    .catch(err=>res.status(400).json("Error:" + err))
});


const port= process.env.PORT || 8000;

app.listen(port,()=>console.log("Server started on port ${port} "));