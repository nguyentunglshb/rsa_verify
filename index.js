const path = require('path')
// const fs = require('fs')
// const jwt = require('jsonwebtoken')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const usersRouter = require('./routes/user')


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://nguyentunglshb:1234@cluster0.993ogzl.mongodb.net/?retryWrites=true&w=majority`, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
    )
    console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', usersRouter )

//RS256

//Private Key read as utf8
// const privateKey = fs.readFileSync('./private.key', 'utf-8')
//Public Key read as utf8
// const publicKey = fs.readFileSync('./public.key', 'utf-8')

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))