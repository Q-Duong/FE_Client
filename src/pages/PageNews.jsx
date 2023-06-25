
import Helmet from '../components/Helmet'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { newsAPI } from '../api/api';
import { Container } from 'react-bootstrap';


function PageNews() {

  const {id} = useParams();

  const [news, setNews] = useState(null);

  useEffect(
    () => {
      
      async function getNewsById(){
        try {
          const res = await newsAPI.getById(id);
          setNews(res.data);
        } catch (error) {
          alert(error);
        }
      }
      if(id)
        getNewsById()
    },[id]
  )
  return (
    news ?
    <Helmet title={news.title}>
        <h3>{news.title}</h3>
        <Container>
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </Container>
    </Helmet>
    : <div>loading</div>
)
}

export default PageNews;