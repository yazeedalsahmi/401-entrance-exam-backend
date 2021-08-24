const express = require('express');

const cors = require('cors');

const axios = require('axios');

require('dotenv').config();

const server = express();

server.use(cors());

server.use(express.json());
const mongoose = require("mongoose");
const PORT =process.env.PORT;
const Schema = mongoose.Schema;
const FavFlowers = new Schema({
    name:{
        type:string
    },
    photo : {
        type:string
    },
    instructions :{
        type:string
    }
})
const FlowersDataFav = mongoose.model("Product",FavFlowers );
mongoose.connect("mongodb://localhost:27017/flowers", { useNewUrlParser: true });
server.get('/getfavflowers',getFavData());
server.get('/getFlower',getFlowerToHome());
server.post('/addFavData', addFav());
server.put('/updateFav',updatefavData());
server.delete('/deletFlowersFav',deletFlowers());

getFlowerToHome = ((req,res)=>{
    axios.get('https://flowers-api-13.herokuapp.com/getFlowers').then((result)=>{
        
        res.send(result.data.flowerslist).catch(error => console.log(error));
        
   })
})
 addFav =((req,res)=>{
    const {name,photo,instructions}=req.body;
    const favData = new FlowersDataFav ({
        name :name ,
        photo : photo,
        instructions : instructions,
    })
     favData.save();
}) 
getFavData = ((req,res) => {
    FlowersDataFav.find({},(err,Data))
    res.send(Data)
})

updatefavData = ((req,res) => {
    const ide = req.params.id
    const{name,photo,instructhions}=req.body
    FlowersDataFav.findOne({name:id},(err,Data)=>{
        Data.name = name,
        Data.photo = photo,
        Data.instructions=instructions,
        Data.save(),then(() =>{FlowersDataFav.find({},(err,Data))
        res.send(Data)})
    }) 
  
})
deletFlowers =((req,res) => {
    const ide = req.params.id
    FlowersDataFav.deletOne({},(err,Data) =>{
    FlowersDataFav.find({},(err,Data)=>{
        res.send(Data)});
    })
});

server.listen(PORT,()=>{
    console.log(`server run on ${PORT}`)
});
