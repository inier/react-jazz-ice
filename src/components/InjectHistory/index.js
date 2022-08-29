import { useHistory } from 'react-router-dom';

/**
 * @description 将reactrouter的history对象注入到window下，便于在Store中使用
 * @returns
 */
const InjectHistory = () => {
  window.reactHistory = useHistory();
  return null;
};

export default InjectHistory;
