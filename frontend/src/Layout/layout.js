import { Layout, Breadcrumb } from "antd";
import styled from "styled-components";

const { Header, Footer, Sider, Content } = Layout;
const CustomContent = styled(Content)`
  padding: "0 50px";
`;

const CustomLayout = (props) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Left Sider</Sider>
        <CustomContent>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{ minHeight: "280px", padding: "24px", background: "#fff" }}
          >
            {props.children}
          </div>
        </CustomContent>
        <Sider>Right Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default CustomLayout;
