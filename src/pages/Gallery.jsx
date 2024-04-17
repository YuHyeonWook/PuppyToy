import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Gallery.scss';
import '../styles/LoadingStyle.scss';

export const Gallery = () => {
  const [dogsData, setDogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = 'live_3qoCzy9xbdRPc32Nij1GI4AdVa4jUW6cJvlZ9gAz84kxNbWOlxC8994mgKDMupyf';

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
          params: {
            limit: 16,
            size: 'small',
          },
          headers: {
            'x-api-key': apiKey,
          },
        });
        setDogsData(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error API dogs:', error);
      }
    };
    fetchDogs();
  }, [apiKey]);

  // ?. 옵셔널 체이닝은 dog.breeds[0]이 undefined 또는 null일 경우를 방지하기 위해 사용.

  return (
    <>
      <Header />
      <div className="gallery__container">
        <h1>강아지 갤러리</h1>
        <div className="dog__gallery">
          {dogsData.map((dog) => (
            <div key={dog.id} className="dog__card">
              <img src={dog.url} alt={dog.breeds[0]?.name} />
              <div className="dog--info">
                <h3>품종: {dog.breeds[0]?.name || '알 수 없음'}</h3>
                <p>성격: {dog.breeds[0]?.temperament || '알 수 없음'}</p>
                <p>평균 수명: {dog.breeds[0]?.life_span || '알 수 없음'}</p>
                <p>
                  무게:{' '}
                  {dog.breeds[0]?.weight.imperial
                    ? `${dog.breeds[0]?.weight.imperial} kg`
                    : '알 수 없음'}{' '}
                </p>
                <p>
                  키:{' '}
                  {dog.breeds[0]?.height.imperial
                    ? `${dog.breeds[0]?.height.imperial} 인치`
                    : '알 수 없음'}
                </p>
              </div>
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="spinner">
            <span className="spinner-inner-1"></span>
            <span className="spinner-inner-2"></span>
            <span className="spinner-inner-3"></span>
          </div>
        )}
      </div>
    </>
  );
};
