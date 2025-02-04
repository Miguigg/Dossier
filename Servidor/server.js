import express from 'express'
import { extract } from '@extractus/article-extractor'
import cors from 'cors'
import { Mistral as _Mistral } from '@mistralai/mistralai'
import bodyParser from 'body-parser'
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' }
import admin from 'firebase-admin'

const app = express()

const mistralKey = "YOUR_MISTRAl_KEY"

const client = new _Mistral({ apiKey: mistralKey })

const port = 3000

app.use(bodyParser.json())
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function validarEnlaceNoticia (enlace) {
  const reEnlace =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  return reEnlace.test(enlace)
}

async function validateTokeb (token) {
  const isValid = await admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      return true
    })
    .catch(token => {
      return false
    })

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

app.post('/mistralAPI/', urlencodedParser, async function (req, res) {
  const isValid = await validateTokeb(req.body.token)

  if (isValid) {
    const data = await extractData(req.body.url)
    if (data != 'failed') {
      await client.classifiers
        .moderate({
          model: 'mistral-moderation-latest',
          inputs: [data]
        })
        .then(async response => {
          response.results[0].url = req.body.url
          await delay(2000)
          await client.chat
            .complete({
              model: 'mistral-large-latest',
              messages: [
                {
                  role: 'user',
                  content:
                    'Dame una respuesta con solamente una lista de 10 palabras clave de este texto, sin más texto, separadas con comas' +
                    data
                }
              ]
            })
            .then(async chatResponse => {
              response.results[0].tags = chatResponse
              await delay(2000)
              await client.chat
                .complete({
                  model: 'mistral-large-latest',
                  messages: [
                    {
                      role: 'user',
                      content:
                        'Haz un resumen de un párrafo de 4 o 5 líneas del siguiente texto' +
                        data
                    }
                  ]
                })
                .then(async chatResponse2 => {
                  response.results[0].resumen = chatResponse2
                  res.send(response)
                })
            })
        })
    }else{
      res.status(406).send('failed, content unreachable')
      res.send('failed')
    }
  } else {
    res.status(403).send('Invalid toke, forbidden');
  }
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
