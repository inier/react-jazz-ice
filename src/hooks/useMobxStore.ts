import { useContext } from 'react';
import { StoresContext } from '@/stores';

const useStores = () => useContext(StoresContext);

export default useStores;
