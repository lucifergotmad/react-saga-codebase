import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '@/config/root-state';
import { navigateTo } from '@/data/routes/navigation.slice';
import { selectCurrentTheme } from '@/data/themes/theme.selector';

const NavigationHandler: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { destination } = useSelector((state: RootState) => state.navigation);
  const currentTheme = useSelector(selectCurrentTheme);

  useEffect(() => {
    if (destination) {
      navigate(destination);
      dispatch(navigateTo(null));
    }
  }, [destination, navigate, dispatch]);

  return (
    <div className={currentTheme}>
      <Outlet />
    </div>
  );
};

export default NavigationHandler;
