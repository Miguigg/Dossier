import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NoticiasLista(){
    
    const [newsDataElDiario, setNewsDataElDiario] = useState([]);
    const [newsDataElMundo, setnewsDataElMundo] = useState([]);
    const [newsDataEuropaPress, setnewsDataEuropaPress] = useState([]);
    const [status, setStatus] = useState('elDiario');
    const [loading, setLoading] = useState(false);

  async function getNewsData() {

    const date = new Date();

    let day = date.getDate()-1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    
    let elDiario = `https://newsapi.org/v2/everything?language=es&from=${currentDate}&sortBy=publishedAt&apiKey=c3afd5ea3f5548adbe7afc7e21c4c0bf&domains=eldiario.es&pageSize=20`
    let elMundo = `https://newsapi.org/v2/everything?language=es&from=${currentDate}&sortBy=publishedAt&apiKey=c3afd5ea3f5548adbe7afc7e21c4c0bf&domains=elmundo.es&pageSize=20`
    let europaPress = `https://newsapi.org/v2/everything?language=es&from=${currentDate}&sortBy=publishedAt&apiKey=c3afd5ea3f5548adbe7afc7e21c4c0bf&domains=europapress.es&pageSize=20`

    setLoading(true);

    const resp = await axios.get(elDiario);
    const resp2 = await axios.get(elMundo);
    const resp3 = await axios.get(europaPress);
    
    setNewsDataElDiario(resp.data.articles);
    setnewsDataElMundo(resp2.data.articles);
    setnewsDataEuropaPress(resp3.data.articles);
    

    setLoading(false);
  }

  useEffect(() => {
    getNewsData();
  }, []);
  

  let content;
  switch (status) {
    case 'elDiario':
      content = newsDataElDiario.map((newsData, index) =>
        <Row className="d-flex justify-content-center bg-light border-bottom" key={newsData.url}>
          <Col xs={8} className="mt-5 w-500" key={index}>
            <a target="_blank" href={newsData.url} rel="noreferrer">
              <Card >
                <Card.Title className="my-3 card-title fs-2 fw-bolder mb-3">  {newsData.title}</Card.Title>
                <Card.Img src={newsData.urlToImage} />
                <Card.Body>

                  <Card.Text className='text-body-secondary fs-6'>
                    {newsData.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        </Row>
      )
      break;
    case 'El Mundo':
      content = newsDataElMundo.map((newsData, index) =>
        <Row className="d-flex justify-content-center bg-light border-bottom" key={newsData.url}>
          <Col xs={8} className="mt-5 w-500" key={index}>
            <a target="_blank" href={newsData.url} rel="noreferrer">
              <Card >
                <Card.Title className="my-3 card-title fs-2 fw-bolder mb-3">  {newsData.title}</Card.Title>
                <Card.Img src={newsData.urlToImage} />
                <Card.Body>

                  <Card.Text className='text-body-secondary fs-6'>
                    {newsData.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        </Row>
      )
      break;
    case 'europaPress':
      content = newsDataEuropaPress.map((newsData, index) =>
        <Row className="d-flex justify-content-center bg-light border-bottom" key={newsData.url}>
          <Col xs={8} className="mt-5 w-500" key={index}>
            <a target="_blank" href={newsData.url} rel="noreferrer">
              <Card >
                <Card.Title className="my-3 card-title fs-2 fw-bolder mb-3">  {newsData.title}</Card.Title>
                <Card.Img src={newsData.urlToImage} />
                <Card.Body>

                  <Card.Text className='text-body-secondary fs-6'>
                    {newsData.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        </Row>
      )
      break;
    default:
      content = <h1>Idle state.</h1>;
  }
    return(
        <div className="App bg-light">
        <header className="App-header bg-light">
          {loading ? "Loading..." : <Container>

            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={() => setStatus('elDiario')} className="btn btn-primary">1</button>
                <button type="button" onClick={() => setStatus('El Mundo')} className="btn btn-primary">2</button>
                <button type="button" onClick={() => setStatus('europaPress')} className="btn btn-primary">3</button>
            </div>
            {content}
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={() => setStatus('elDiario')} className="btn btn-primary">1</button>
                <button type="button" onClick={() => setStatus('El Mundo')} className="btn btn-primary">2</button>
                <button type="button" onClick={() => setStatus('europaPress')} className="btn btn-primary">3</button>
            </div>
          </Container>
          }
        </header>
      </div>
    );
}

export default NoticiasLista;