import React from "react";
import "./LogInForm.css";
import { Link } from "react-router-dom";
import { AxiosError } from 'axios';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { authStore } from "../../features/auth";
import { useNavigate } from "react-router-dom";

const LogInForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    authStore.login(formData)
    .then(() => {
      navigate('/');
    })
    .catch((error: AxiosError) => {
      alert(JSON.stringify(error.response?.data));
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="./RestorePassword">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="../SignUp">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LogInForm;
