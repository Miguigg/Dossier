import express from 'express'
import { extract } from '@extractus/article-extractor'
import cors from 'cors'
import { Mistral as _Mistral } from '@mistralai/mistralai'
import bodyParser from 'body-parser'
import serviceAccount from './serviceAccountKey.json' assert   { type: "json" };
import admin from 'firebase-admin'

const app = express()

const mistralKey = 'Nvl5lYkexkTV9Xid23WKbOSY2Hb2LRj8'

const client = new _Mistral({ apiKey: mistralKey })

const port = 3000




function validarEnlaceNoticia (enlace) {
  const reEnlace =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  return reEnlace.test(enlace)
}

app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function validateTokeb(token) {
const isValid = await admin
  .auth().verifyIdToken(token)
  .then((decodedToken) => {
    console.log("Correcto")
    return true
  })
  .catch((token) => {
    console.log("Incorrecto")
    return false
  });

  return isValid
}

async function extractData (enlace) {
  if (validarEnlaceNoticia(enlace)) {
    try {
      const contenido = await extract(enlace)
      const filtrado = contenido.content
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/\s\s+/g, ' ')

      return filtrado
    } catch {
      return 'failed'
    }
  }
}

app.use(bodyParser.json())
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/mistralAPI/', urlencodedParser, async function (req, res) {  
  
  const isValid = await validateTokeb(req.body.token)
  
  if( isValid){
    const data = await extractData(req.body.url)
  
    await client.classifiers
    .moderate({
      model: 'mistral-moderation-latest',
      inputs: [data]
    })
    .then(response => {
      console.log(response.results[0])
      res.send(response.results[0].categories)
    })
  }else{
    res.send("Token incorrecto")
  }
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
