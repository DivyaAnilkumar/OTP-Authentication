const express = require('express');
const app = new express();
const otpRoutes = require('./routes/otpRoutes');
const cors = require('cors');

app.use(cors());


require('dotenv').config();



require('./db/connection');
app.use('/otp',otpRoutes)


const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})