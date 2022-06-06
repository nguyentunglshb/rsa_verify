const express = require('express')
const rsa = require('node-rsa')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const User = require('../models/User')

const publicKey = new rsa()
const privateKey = new rsa()

const public = fs.readFileSync('Keys/public.pem', 'utf8')
const private = fs.readFileSync('Keys/private.pem', 'utf8')

publicKey.importKey(public)
privateKey.importKey(private)


function CreateLicense(cccd) {
    const encrypted = privateKey.encryptPrivate(
        cccd,
        'base64'
    )
    return encrypted
}


function checkValid(license) {
    const decrypted = publicKey.decryptPublic(license, 'utf8')

    if("123456789012" == decrypted) {
        return true
    } else {
        return false
    }
}



//get all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find()
        if(!allUsers) {
            return res.status(400).json({
                success: false,
                message: 'Users is empty'
            })
        }
        
        res.json({success: true, allUsers})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Interal server error'
        })
    }
})

//register
router.post('/register', async (req, res) => {
    try {
        const { cccd, name, age } = req.body

        if(!cccd || !name || !age) {
            return res.status(400).json({
                success: false,
                message: 'Your card is not valid'
            })
        }

        if(cccd.length !== 12) {
            return res.status(400).json({
                success: false,
                message: "Your id is not 12 length"
            })
        }

        try {
            const user = await User.findOne({cccd: cccd})
            if(user) {
                return res.status(400).json({
                    success: false,
                    message: 'This id has been used before'
                })
            }
            const newUser = new User({
                cccd: cccd.toString(),
                name,
                age: age.toString()
            })

            await newUser.save()

            return res.json({
                success: true,
                message: 'Create an account successfully',
                newUser
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something was wrong here"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Interal server error'
        })
    }
})

//login
router.post('/login', async (req, res) => {
    const {cccd} = req.body
    const isValid = checkValid(CreateLicense(cccd.toString()))
    console.log(valid);
    if(!cccd) {
        return res.status(400).json({
            success: false,
            message: "No Id input"
        })
    }
        try {
            const user = await User.findOne({cccd: cccd.toString()})
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Cant find your Id'
                })
            }
    
            res.json({
                success: true,
                message: 'Login successfully',
                user
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Interal server error'
            })
    
        }

})

//edit
// router.put('/:')

module.exports = router