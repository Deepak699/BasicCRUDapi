const mongoose = require('mongoose')
module.exports = mongoose.connect(process.env.MONGODB_URL,{  useNewUrlParser:true,
    useCreateIndex:true, useUnifiedTopology: true ,dbName:'UserApi'}).then(()=>{
    console.log("db connected")
}).catch((E)=>{
    console.log(E)
})