import '@styles/Recommend.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DogInfo from './DogInfo';
import Loading from './Loading';

const DogRecommend = () => {
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
          <Loading />
        ) : (
          <>
            {dogsData.map((dog) => (
              <DogInfo key={dog.id} dog={dog} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DogRecommend;
