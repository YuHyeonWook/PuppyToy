import '../styles/Recommend.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dog from '../components/Dog';

const Recommend = () => {
  const [dogsData, setDogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
          params: {
            limit: 3,
            size: 'small',
            has_breeds: true,
          },
          headers: {
            'x-api-key': import.meta.env.VITE_THEDOG_API_KEY,
          },
        });
        setDogsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error API dogs:', error);
      }
    };
    fetchDogs();
  }, []);

  return (
    <div className="recommend">
      <h2>오늘의 귀여운 강아지</h2>
      <div className="dogs">
        {isLoading ? (
          <div className="spinner">
            <span className="spinner-inner-1"></span>
            <span className="spinner-inner-2"></span>
            <span className="spinner-inner-3"></span>
          </div>
        ) : (
          <>
            {dogsData.map((dog) => (
              <Dog key={dog.id} dog={dog} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Recommend;
