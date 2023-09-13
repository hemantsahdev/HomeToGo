const express = require("express");
const router = express.Router();

const USERS=require("./Model/user");
const PLACES=require("./Model/place");
const BOOKING=require("./Model/booking");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// IMAGES HANDLING
const imageDownloader=require("image-downloader");
const multer=require('multer');


router.use('/uploads',express.static(__dirname+"/uploads"))

const {validateUser} =require ("./validate");
const TEMP = require("./Model/tempBooking");




router.post("/register", async (req,res)=>{

    const {name,email,password}=req.body;
    // validate
    const {error}=validateUser(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    });


    // already exist
    const userExist=await USERS.findOne({
        email:req.body.email
    })

    if (userExist) return res.status(400).json({
        message: "Email already Exist"
    })
    console.log(name);

    // hash pass
    const hashedPassword = await bcrypt.hash(req.body.password, 10);


    // create user

    const user =new USERS({
        name,email,
        password:hashedPassword

    })

    try{
        const userSaved = await user.save();
        res.json({
            id:userSaved._id,
            message:"User created successfully"
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }






})


router.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    try{
        // check if user exist
        const user = await USERS.findOne({
            email
        });
        if (!user) res.status(400).json({
            message: "User Not Found!"
        })

        const validPass = await bcrypt.compare(password, user.password)

        if (!validPass) return res.status(400).json({
            message: "Invalid Credentials"
        })

        // creating jwt

        // TOKEN CREATED WITH (email + _id)
        const payload={
            email:user.email,
            id:user._id
        }

        const userToken = await jwt.sign(payload, process.env.USER_TOKEN);
        // res.cookie('token',userToken,{httpOnly:true, secure:false,sameSite:'none' ,domain:'localhost'})
        // localStorage.setItem('token',userToken);
// 
          res.json({
              message: "Logged In",
              user,
              token:userToken
          })

    }
    catch(err){
        res.status(400).json({
            message:"Login Failed!"
        })
    }
    
})

router.get("/profile",async(req,res)=>{
    const authUser=req.headers.token;
   
    if(authUser){
       
        // we will get email and id
        const token = jwt.verify(authUser, process.env.USER_TOKEN);
        const {name,email,_id}=await USERS.findOne({_id:token.id})
       
        res.json({
           name,email,_id
        })
    }
    else{
        res.json(null);
    }
    

})


// IMAGES
router.post("/upload-by-link",async (req,res)=>{
    const {link}=req.body;
    
    const newImageName= 'photo'+Date.now()+".jpg";

    const options={
        url:link,
        dest:__dirname+'/uploads/'+newImageName
    }
    
   await imageDownloader.image(options);

   res.json(newImageName);
    
})

// handling photos uploaded locally by machine
const photosMiddleware=multer({dest:'uploads/'})
router.post("/upload", photosMiddleware.single('photo'),(req, res) => {
    res.json(req.file);
})


// USER
router.post("/places",async(req,res)=>{
    
    const {
        title,
        address,
       addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    }=req.body

    if(!title ) return res.status(400).json({message:"Title is mandatory!"})
    if(!address ) return res.status(400).json({message:"Address is mandatory!"})
    if(!checkIn ) return res.status(400).json({message:"Please select a checkIn time!"})
    if(!checkOut ) return res.status(400).json({message:"Please select a checkOut time!"})
    if(!maxGuests ) return res.status(400).json({message:"Maximum number of guests field is required!"})
    if(!price ) return res.status(400).json({message:"Price is mandatory!"})

    const authUser = req.headers.token;
    const token = jwt.verify(authUser, process.env.USER_TOKEN);

   
    const place= new PLACES({
        // owner will be equal to id of the user
        owner:token.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    })

    try{
        const placeSaved= await place.save();

        res.json(placeSaved);
    }
    catch(err){
        res.json({error:err.message})
    }
})

//        for host to see his added/hosted places
router.get("/userPlaces",async(req,res)=>{
    const authUser = req.headers.token;
    const {id} = jwt.verify(authUser, process.env.USER_TOKEN);

    const ownerPlaces=await PLACES.find({owner:id});
    // console.log(ownerPlaces)
    res.json(ownerPlaces);
})

// for host (to update teh form) for user (to see details from the landing page)
router.get('/places/:id',async(req,res)=>{
    const {id}=req.params;
    const place=await PLACES.findById(id);
    res.json(place)
})
// update the  places by host
router.put("/places/", async (req,res)=>{

     const authUser = req.headers.token;
     const token = jwt.verify(authUser, process.env.USER_TOKEN);
    if(!token) return res.status(400).json({message:"You need to LogIn"})
    // console.log(token)
    const {
         id,
         title,
         address,
         addedPhotos,
         description,
         perks,
         extraInfo,
         checkIn,
         checkOut,
         maxGuests,
         price
     }=req.body

     const place=await PLACES.findById(id);
    //  console.log(place);
    //  accessing the id we got, to the id of the token(user logged in)
     if(token.id=== place.owner.toString()){
//              need to compare the objectID thing to string to compare to token id

        // ONE WAY
        // place.updateOne()
        // OTHER WAY:
        place.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        await place.save();
        res.json('ok')
     }

})

// for user at the landing page
router.get('/places' , async(req,res)=>{

    const places= await PLACES.find();
    res.json(places);

})


// validating  the details
router.post("/validate",(req,res)=>{
    const {
        checkIn,
        checkOut,
        numberOfGuests,
        fullName,
        phoneNumber
    } = req.body;

    if(!checkIn) return res.status(400).json({message:"checkIn dates required!"})
    else if(!checkOut) return res.status(400).json({message:"checkOut dates required!"})
    else if(!fullName) return res.status(400).json({message:"Full Name required!"})
    else if(!numberOfGuests) return res.status(400).json({message:"Total Number of Guests required!"})
    else if(!phoneNumber) return res.status(400).json({message:"Phone Number required!"})
    else return res.json({mssage:'ok'})
    
})


// booking the place
router.post("/booking",async (req,res)=>{

      const authUser = req.headers.token;
      const {
          id
      } = jwt.verify(authUser, process.env.USER_TOKEN);
      if (!id) return res.status(400).send("User Access Denied")

    const {
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        fullName,
         phoneNumber,
         price,
         
    } = req.body;
    

    const booking=new BOOKING({
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        fullName, phoneNumber, price,user:id
    })
    const bookingSaved= await booking.save();
    res.json(bookingSaved)
})


// temp saving the till the payment gets success
router.post("/temp", async (req, res) => {
    const authUser = req.headers.token;
    const {
        id
    } = jwt.verify(authUser, process.env.USER_TOKEN);
    if (!id) return res.status(400).send("User Access Denied")

    const {
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        fullName,
        phoneNumber,
        price,

    } = req.body;

    
    const tempBooking = new TEMP({
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        fullName,
        phoneNumber,
        price,
        user: id
    })
    const tempBookingSaved = await tempBooking.save();
    res.json(tempBookingSaved)
})

router.get("/getTempBooking",async(req,res)=>{

    // console.log(req.headers.tempbookingid);
    const tempId = req.headers.tempbookingid;
      
    //    console.log(hello)
    const tempBookedData = await TEMP.findById(tempId);
    if(!tempBookedData) return res.status(400).json("Booking failed")
    res.json(tempBookedData);

})

router.get("/booking",async(req,res)=>{
     const authUser = req.headers.token;
     const {
         id
     } = jwt.verify(authUser, process.env.USER_TOKEN);
     if(!id) return res.status(400).send("User Access Denied")

     try{
        const response = await BOOKING.find({
            user: id
        }).populate('place');
        
        res.json(response);
     }
     catch(err){
        throw err;
     }
     

     
})


router.get('/host/:id',async(req,res)=>{

    const {id}=req.params;
    
    try {
        const place=await PLACES.findById(id).populate('owner');
       
        res.json(place.owner);
    } catch (error) {
        res.json(error)
    }


})



module.exports=router;