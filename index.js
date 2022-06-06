const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

//RS256

//Private Key read as utf8
const privateKey = fs.readFileSync('./private.key', 'utf-8')
//Public Key read as utf8
const publicKey = fs.readFileSync('./public.key', 'utf-8')

//The result
const payload = {}

payload.field01 = 'Data 01'
payload.field02 = 'Data 02'
payload.field03 = 'Data 03'

console.log("Payload: ", JSON.stringify(payload));

console.log((" "));

const iss = "Nguyen Tung"
const phone = '0376703212'
const age = '23'

const exp = '24h'

const signOptions = {
    issuer: iss,
    expiresIn: exp,
    algorithm: 'RS256'
}

const token = jwt.sign(payload, privateKey, signOptions)
console.log("token: ", JSON.stringify(token));

const verifyOptions = {
    issuer: iss,
    expiresIn: exp,
    algorithm: ["RS256"]
}

const verified = jwt.verify(token, publicKey, verifyOptions)
console.log("verified: ", JSON.stringify(verified));

//Decode

const decoded = jwt.decode(token, {complete: true})
// console.log("Decoded Header: ", JSON.stringify(decoded.header));
console.log("Decoded Header: ",(decoded.header));
// console.log("Decoded Payload: ", JSON.stringify(decoded.payload));
console.log("Decoded Payload: ", (decoded.payload));

process.exitCode = 1