import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { ConfigProvider } from 'antd';

import { adjustableTheme } from './constants';
import { StylesContext } from './context';
import { Routers } from './routes';

function App() {
  const { mytheme } = useSelector(state => state.theme);

  return (
    <HelmetProvider>
      <ConfigProvider theme={adjustableTheme(mytheme)}>
        <StylesContext.Provider
          value={{
            rowProps: {
              gutter: [
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 8, sm: 16, md: 24, lg: 32 },
              ],
            },
            carouselProps: {
              autoplay: true,
              dots: true,
              dotPosition: 'bottom',
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          }}
        >
          <RouterProvider
            router={Routers}
            future={{ v7_startTransition: true }}
          />
        </StylesContext.Provider>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
