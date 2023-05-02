import { useNavigate } from 'react-router-dom';

export  function useBack() {
  const navigate = useNavigate();

  function navigateBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  return navigateBack;
}
