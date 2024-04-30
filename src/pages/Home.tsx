import Timer from '../components/Timer';
import DogRecommend from '../components/DogRecommend';
import { Layout } from '../components/layout/Layout';

export const Home = () => {
  return (
    <>
      <Layout>
        <Timer />
        <DogRecommend />
      </Layout>
    </>
  );
};
