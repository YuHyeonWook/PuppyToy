import React, { useEffect, useState } from 'react';
import DogInfo from './DogInfo';
import Loading from './common/Loading';
import { fetchDogs } from '../api/fetchDogs';
import '@styles/DogRecommend.scss';

const DogRecommend = () => {
  const [dogsData, setDogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDogs = async () => {
      setIsLoading(true);
      const dogsData = await fetchDogs({ limitNumber: 3 });
      setDogsData(dogsData);
      setIsLoading(false);
    };
    getDogs();
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
