import {useState} from 'react';

const useInput = (inputValue = '') => {
  const [value, setValue] = useState(inputValue);

  const onChanged = (event) => {
    setValue(event.target.value);
  };

  return [value, onChanged];
};

export default useInput;

