import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import moment from 'moment';

import Loader from './Loader';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;

const demoImage = 'https://coinrevolution.com/wp-content/uploads/2024/08/Top-Expert-Predicts-300-Rally-in-2-Weeks-as-Solana.png';

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({ count: simplified ? 6 : 12 });

  if (!cryptoNews) return <Loader />;

  return (
    <Row gutter={[ 24, 24 ]}>
      {cryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.title}</Title>
                <img className='news-image' src={news?.media[0] || demoImage} alt="news" />
              </div>
              <p>
                {news.summary > 100
                  ? `${news.summary.substring(0, 100)}`
                  : news.summary
                }
              </p>
              <div className='provider-container'>
                <div>
                  <Text>{moment(news.published.slice(0, 19)).startOf('ss').fromNow()}</Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News