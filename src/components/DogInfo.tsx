import '@styles/DogInfo.scss';

const DogInfo = ({ dog }: any) => {
  return (
    <div className="dog">
      <div className="dog__image">
        <img src={dog.url} alt={dog.breeds[0]?.name} />
      </div>
      <div className="dog__info">
        <h3>{dog.breeds[0]?.name || '알 수 없음'}</h3>
        <div>
          <p className="key">성격</p>
          <p className="value">{dog.breeds[0]?.temperament || '알 수 없음'}</p>
        </div>
        <div>
          <p className="key">평균 수명</p>
          <p className="value">{dog.breeds[0]?.life_span || '알 수 없음'}</p>
        </div>
        <div>
          <p className="key">무게</p>
          <p className="value">
            {' '}
            {dog.breeds[0]?.weight.imperial
              ? `${dog.breeds[0]?.weight.imperial} kg`
              : '알 수 없음'}{' '}
          </p>
        </div>
        <div>
          <p className="key">키</p>
          <p className="value">
            {dog.breeds[0]?.height.imperial
              ? `${dog.breeds[0]?.height.imperial} 인치`
              : '알 수 없음'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DogInfo;
