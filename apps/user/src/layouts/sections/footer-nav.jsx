import { Layout } from 'antd';

const { Footer } = Layout;

// type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

const FooterNav = ({ ...others }) => {
  return (
    <Footer {...others}>AntD Dashboard © 2023 Created by Design Sparx</Footer>
  );
};

export default FooterNav;
