import { createContext, useContext } from 'react';
// import { CarouselProps, RowProps } from 'antd';

// export type StylesContentProps = {
//   rowProps: RowProps;
//   carouselProps: CarouselProps;
// };

/**
 * :StylesContentProps
 *  {
 *    rowProps: RowProps;
 *    carouselProps: CarouselProps;
 *  }
 */
export const StylesContext = createContext(null);

export const useStylesContext = () => useContext(StylesContext);
