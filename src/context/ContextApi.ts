import { createContext } from 'react';
import { ApiType } from '../types';

const ApiContextResponse = createContext<ApiType>({
  data: [],
  error: '',
});

export default ApiContextResponse;
