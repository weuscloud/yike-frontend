import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function AuthForm({ children, formType, bgColor, textColor }) {
  const formTitle = formType === "login" ? "登录" : "新用户";
  const btnText= formType === "login" ? "确认" : "注册";
  const usernameRules = [
    { required: true, message: "请输入用户名!" },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: "用户名需为字母或数字，5-10字",
    },
  ];

  const passwordRules = [
    { required: true, message: "请输入密码!" },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z!@#$%^&*.]{8,16}$/,
      message:
        "要求密码长度在8到16个字符之间，至少包含一个数字和一个英文字母，可以包含特殊字符",
    },
  ];
  const onFinish = (values) => {
    // handle form submission
  };
  return (
    <div style={{ backgroundColor: bgColor, padding: "1rem" }}>
      <h2 style={{ color: textColor }}>{formTitle}</h2>
      <Form name="auth_form" onFinish={onFinish}>
        <Form.Item name="username" rules={usernameRules}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="邮箱或手机号"
          />
        </Form.Item>

        <Form.Item name="password" rules={passwordRules}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item
        name="sbbtn"
        
        >
          <Button
          style={{float:"right"}}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
          {btnText}
          </Button>
        </Form.Item>
        {children}
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  bgColor: state.theme[state.app.theme].bgColor,
  textColor: state.theme[state.app.theme].textColor,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
