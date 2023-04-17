import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import crypto from "crypto";
import axios from "axios";
function LoginForm({ bgColor, textColor }) {
  const onFinish = (values) => {
    const { username, password } = values;
    // const sha256Password = crypto
    //   .createHash("sha256")
    //   .update(password)
    //   .digest("hex");
    //   axios.login({ username, password: sha256Password })
    //   .then((res) => {
    //     console.log(res);
    //     // 处理登录成功的情况
    //     // 例如：跳转到首页等
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     // 处理登录失败的情况
    //     // 例如：提示用户登录失败信息等
    //   });
  };

  return (
    <div style={{ backgroundColor: bgColor, padding: 20 }}>
      <h2 style={{ color: textColor }}>用户登录</h2>
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: textColor }}>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          或 <Link to="/regist">现在注册!</Link>
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="/">
            申诉
          </a>
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
