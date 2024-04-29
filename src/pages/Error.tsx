import '../styles/NotFound.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Error = () => {
  return (
    <>
      <Header />
      <div className="not-found">
        <p className="not-found__code">404</p>
        <p className="not-found__name">Not Found</p>
        <p className="not-found__description">
          페이지를 찾을 수 없습니다.
          <br />
          입력하신 페이지 주소가 정확한지 또는 존재하는지 확인바랍니다.
        </p>
      </div>
      <Footer />
    </>
  );
};
