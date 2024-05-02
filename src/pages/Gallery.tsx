import { useState, useEffect } from 'react';
import DogInfo from '../components/DogInfo';
import Loading from '../components/common/Loading';
import { fetchDogs } from '../api/fetchDogs';
import { Layout } from '../components/layout/Layout';
import '@styles/Gallery.scss';
import '@styles/Loading.scss';
import { DogType } from 'src/lib/types/UserTypes';

export const Gallery = () => {
  const [dogsData, setDogsData] = useState<DogType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDogs = async () => {
      setIsLoading(true);
      const dogsData = await fetchDogs({ limitNumber: 16 });
      setDogsData(dogsData);
      setIsLoading(false);
    };
    getDogs();
  }, []);

  return (
    <>
      <Layout>
        <div className={`gallery ${isLoading ? 'loading' : 'loaded'}`}>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="dogs">
              {dogsData.map((dog) => (
                <DogInfo key={dog.id} dog={dog} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
