const rsa = require('node-rsa')
const fs = require('fs')


const GeneratePair = () => {
    const key = new rsa().generateKeyPair()

    const publicKey = key.exportKey("public")
    const privateKey = key.exportKey("private")

    fs.openSync('../Keys/public.pem', "w")
    fs.writeFileSync("../Keys/public.pem", publicKey, "utf8")

    fs.openSync('../Keys/private.pem', "w")
    fs.writeFileSync("../Keys/private.pem", privateKey, "utf8")

}

GeneratePair()

module.exports = GeneratePair