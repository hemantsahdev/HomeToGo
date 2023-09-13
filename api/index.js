const express=require ("express");
const app=express();

const cors=require("cors");
app.use(cors());

const userAuth=require("./userAuth");
// pass cfB3QQJHpPosT9Uv

// connect DB and .env
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const PLACES = require("./Model/place");
dotenv.config();
mongoose.connect(process.env.DB_CONNECT);
mongoose.connection.on('connected', () => {
    console.log("connected to db")
})

// for body parsing
app.use(express.json());


app.use("/" , userAuth)


// STRIPE
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY) 

app.post('/create-checkout-session',async(req,res)=>{

        const {
            placeId,
            totalNumberOfNights
        } = req.body;


    try {
        const place = await PLACES.findById(placeId);

      
       const session=await stripe.checkout.sessions.create({
        

            payment_method_types:['card'], //it contains the arr of all the payment types we want
            mode:'payment' ,         //payment menas one time payment ans other is subscription type
            line_items:[{
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:place.title,
                    },
                    unit_amount: place.price*100
                },
                quantity:totalNumberOfNights,
            }],
            success_url: `http://localhost:5173/booking/success`,
            cancel_url: 'http://localhost:5174',
        })

        res.json({
            url: session.url
        })
        
    } catch (e) {
        console.log(e.message)
    }
    
    
    
})














app.listen(4000,()=>{
    console.log("connected to port 4000");
    
})