import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '@/config/root-state';
import { navigateTo } from '@/data/navigation/navigation.slice';

const NavigationHandler: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { destination } = useSelector((state: RootState) => state.navigation);

  useEffect(() => {
    if (destination) {
      navigate(destination);
      dispatch(navigateTo(null));
    }
  }, [destination, navigate, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default NavigationHandler;
