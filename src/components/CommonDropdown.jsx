import { useState, useRef } from 'react';
import '../styles/DropdownStyle.scss';

const Dropdown = ({ list, onValueChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputEl = useRef(null);
  const wrapperEl = useRef(null);
  const ulEl = useRef(null);

  const handleClickArrow = (event) => {
    event?.stopPropagation();
    handleInputClick();
    handleInputFocus();
  };

  const handleInputClick = (event) => {
    event?.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleInputFocus = (event) => {
    event?.stopPropagation();
    setIsFocused(true);
  };

  const handleInputBlur = (event) => {
    event?.stopPropagation();
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleClickLi = (item, event) => {
    event?.stopPropagation();
    setInputValue(item);
    setIsOpen(false);
    inputEl.current.focus();
    onValueChange(item);
  };

  return (
    <div className="wrapper-box" ref={wrapperEl}>
      <input
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className={'input-box' + (isFocused ? ' focused' : '')}
        type="text"
        readOnly
        value={inputValue}
        ref={inputEl}
        placeholder={placeholder}
      />
      <button className={'arrow' + (isOpen ? ' open' : '')} onClick={handleClickArrow}>
        <i className="bx bxs-chevron-down"></i>
      </button>
      <ul className={'ul-box' + (isOpen ? ' open' : '')} ref={ulEl}>
        {list.map((item) => (
          <li className={inputValue === item ? 'selected' : ''} key={item}>
            <button onMouseDown={(event) => handleClickLi(item, event)}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dropdown;
