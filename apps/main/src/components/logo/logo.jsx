import { Typography, theme } from 'antd';
import { Link } from 'react-router-dom';
// import { CSSProperties } from 'react';

import './styles.css';

// type LogoProps = {
//   color: CSSProperties['color'];
//   imgSize?: {
//     h?: number | string;
//     w?: number | string;
//   };
//   asLink?: boolean;
//   href?: string;
//   bgColor?: CSSProperties['backgroundColor'];
// } & Partial<FlexProps>;

export const Logo = ({ asLink, color, href, imgSize, bgColor, ...others }) => {
  return asLink ? (
    <Link to={href || '#'} className="logo-link">
      <div className="flex items-center gap-2">
        <img
          src="/logo-no-background.png"
          alt="design sparx logo"
          height={imgSize?.h || 48}
          width={imgSize?.h || 48}
        />
        <Typography.Title
          level={5}
          type="secondary"
          style={{
            color,
            margin: 0,
            padding: `4px 8px`,
            backgroundColor: bgColor,
            borderRadius: 1,
          }}
        >
          Oh my Forms
        </Typography.Title>
      </div>
    </Link>
  ) : (
    <div {...others}>
      <img
        src="/logo-no-background.png"
        alt="design sparx logo"
        height={imgSize?.h || 48}
      />
      <Typography.Title
        level={4}
        type="secondary"
        style={{
          color,
          margin: 0,
          padding: `4px 8px`,
          backgroundColor: bgColor,
          borderRadius: 1,
        }}
      >
        Antd Admin
      </Typography.Title>
    </div>
  );
};
