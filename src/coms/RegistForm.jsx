import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function LoginForm({ bgColor, textColor }) {
  const onFinish = (values) => {

  };

  return (
    <div style={{ backgroundColor: bgColor, padding: 20}}>
      <h2 style={{ color: textColor }}>用户注册</h2>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
         <Form.Item
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            {
              pattern: /^[a-zA-Z][0-9]{0,19}$/,
              message: "用户名必须以英文字母开头，之后是数字，总长度不超过20",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入密码!" },
            {
              pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,16}$/,
              message:
                "密码必须包含英文字母、英文符号和数字中的至少两种，且长度为8-16位",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
          或 <Link to="/login">登录</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  bgColor: state.theme[state.app.theme].bgColor,
  textColor: state.theme[state.app.theme].textColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
