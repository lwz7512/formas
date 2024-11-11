// import { theme as antdTheme } from 'antd';

import { COLOR } from '.';

/**
 * generate theme config
 *
 * @param {string} mytheme theme type frome redux
 * @returns
 */
export const adjustableTheme = mytheme => ({
  token: {
    colorPrimary: COLOR['500'],
    borderRadius: 6,
    fontFamily: 'Lato, sans-serif',
  },
  components: {
    Breadcrumb: {
      // linkColor: 'rgba(0,0,0,.8)',
      // itemColor: 'rgba(0,0,0,.8)',
    },
    Button: {
      colorLink: COLOR['500'],
      colorLinkActive: COLOR['700'],
      colorLinkHover: COLOR['300'],
    },
    Calendar: {
      colorBgContainer: 'none',
    },
    Card: {
      colorBorderSecondary: COLOR['borderColor'],
    },
    Carousel: {
      colorBgContainer: COLOR['800'],
      dotWidth: 8,
    },
    Rate: {
      colorFillContent: COLOR['100'],
      colorText: COLOR['600'],
    },
    Segmented: {
      colorBgLayout: COLOR['100'],
      borderRadius: 6,
      colorTextLabel: '#000000',
    },
    Table: {
      borderColor: COLOR['100'],
      colorBgContainer: 'none',
      headerBg: 'none',
      rowHoverBg: COLOR['50'],
    },
    Tabs: {
      colorBorderSecondary: COLOR['100'],
    },
    Timeline: {
      dotBg: 'none',
    },
    Typography: {
      colorLink: COLOR['500'],
      colorLinkActive: COLOR['700'],
      colorLinkHover: COLOR['300'],
      linkHoverDecoration: 'underline',
    },
  },
});
