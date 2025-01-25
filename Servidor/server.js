// server.js
import express from 'express'
import { extract } from '@extractus/article-extractor'
const app = express()
import cors from 'cors'
import { Mistral as _Mistral } from '@mistralai/mistralai'
const mistralKey = 'Nvl5lYkexkTV9Xid23WKbOSY2Hb2LRj8'

const client = new _Mistral({ apiKey: mistralKey })

const port = 3000

function validarEnlaceNoticia (enlace) {
  const reEnlace =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  return reEnlace.test(enlace)
}

app.use(cors())

async function handleShowMistral (text) {
  try {
    await client.classifiers
      .moderate({
        model: 'mistral-moderation-latest',
        inputs: [text]
      })
      .then(response => {
        console.log(response.results[0].categories)
        return response.results[0].categories
      })
  } catch (e) {
    return 'failed'
  }
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
    } catch (err) {
      return 'failed'
    }
  }
}

//http://localhost:3000/mistralAPI/https:%2F%2Fwww.eldiario.es%2Fcatalunya%2Ffeijoo-afirma-moratoria-antidesahucios-protegido-58-000-familias-no-beneficiado-nadie_1_11990244.html
app.get('/mistralAPI/:text', async (req, res) => {
  const enlace = req.params.text
  const data = await extractData(enlace)

  await handleShowMistral(data).then(response => {res.send(response)})

 /* if (response === 'failed' || response === undefined) {
    console.log('Error en el servidor')
    res.status(500).send('Error en el servidor')
  } else {
    res.json(response)
  }*/
})

// Starting the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
