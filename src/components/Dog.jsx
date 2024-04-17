import '../styles/Dog.scss';
import React from 'react';

const Dog = ({ dog }) => {
  return (
    <div className="dog">
      <img className="dog__image" src={dog.url} alt={dog.breeds[0]?.name} />
      <div className="dog__info">
        <h3>품종: {dog.breeds[0]?.name || '알 수 없음'}</h3>
        <p>성격: {dog.breeds[0]?.temperament || '알 수 없음'}</p>
        <p>평균 수명: {dog.breeds[0]?.life_span || '알 수 없음'}</p>
        <p>
          무게:{' '}
          {dog.breeds[0]?.weight.imperial ? `${dog.breeds[0]?.weight.imperial} kg` : '알 수 없음'}{' '}
        </p>
        <p>
          키:{' '}
          {dog.breeds[0]?.height.imperial ? `${dog.breeds[0]?.height.imperial} 인치` : '알 수 없음'}
        </p>
      </div>
    </div>
  );
};

export default Dog;
