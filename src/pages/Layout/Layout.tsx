import { Outlet, NavLink } from "react-router-dom";
import "../../app/App.css";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;

const Arrangement = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>
            <NavLink to="/">Main</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/PersonalAccount">PersonalAccount</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/LogIn">LogIn</NavLink>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Posts app ©2023 Created by Me :/
      </Footer>
    </Layout>
  );
};
export { Arrangement };
