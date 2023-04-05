import { IdcardOutlined, LockOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import type { TourProps } from "antd";
import { Button, Divider, Form, Input, Tour, Switch, Checkbox } from "antd";
import * as React from "react";
import { AXFIArrowLogIn } from "@axframe/icon";
import { SMixinFlexColumn, SMixinFlexRow } from "@core/styles/emotion";
import { useDialog, useDidMountEffect, useI18n, useSpinning } from "hooks";
import { getTrimNonEmptyRegExp } from "@core/utils/formPatterns/getTrimNonEmptyRegExp";
import { UserService } from "services";
import { useUserStore } from "stores";
import { LangSelector } from "components/LangSelector";

interface Props {
  onSignIn?: (values: SignInFormItem) => Promise<void>;
}

export interface SignInFormItem {
  userId?: string;
  password?: string;
  remember?: boolean;
}

function App({}: Props) {
  const setMe = useUserStore((s) => s.setMe);
  const { t, currentLanguage, setLanguage } = useI18n();
  const { spinning, setSpinning } = useSpinning<{ signIn: boolean }>();
  const { errorDialog } = useDialog();
  const [open, setOpen] = React.useState(false);
  const [isApiTest, setIsApiTest] = React.useState(false);

  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const steps: TourProps["steps"] = [
    {
      title: "Hello Stranger! This is a demo page.",
      description: "Please enter any value for your ID and password.",
      target: () => ref1.current,
    },
    {
      title: "Sign In",
      description: "Click Sign In Button",
      target: () => ref2.current,
      onFinish: () => {
        localStorage.setItem("isRegularUser", "true");
        setOpen(false);
      },
    },
  ];

  const [form] = Form.useForm<SignInFormItem>();

  const onSignIn = React.useCallback(
    async (values: SignInFormItem) => {
      setSpinning({ signIn: true });
      try {
        if (values.remember && values.userId) {
          localStorage.setItem("remember", values.userId);
        } else {
          localStorage.removeItem("remember");
        }

        const { rs } = await UserService.signIn({
          userCd: values.userId,
          userPs: values.password,
        });
        await setMe(rs);
      } catch (err) {
        await errorDialog(err);
      } finally {
        setSpinning({ signIn: false });
      }
    },
    [errorDialog, setMe, setSpinning]
  );

  React.useEffect(() => {
    const remember = localStorage.getItem("remember");

    if (remember) {
      form.setFieldsValue({
        userId: remember,
        remember: true,
      });
      form.getFieldInstance("password").focus();
    } else {
      form.getFieldInstance("userId").focus();
    }

    const isTest = sessionStorage.getItem("isApiTest");
    setIsApiTest(isTest === "T");
  }, [form]);

  useDidMountEffect(() => {
    form.setFieldsValue({ userId: "AXFrame", password: "1" });
    if (!localStorage.getItem("isRegularUser")) {
      setOpen(true);
    }
  });

  return (
    <>
      <SignInContainer>
        <SignInBox ref={ref1}>
          <SignInVisual />
          <SignInFormBox>
            <SignInLogo />
            <SignInBoxBody>
              <Form<SignInFormItem> form={form} onFinish={onSignIn} layout={"vertical"}>
                <Form.Item
                  label={t.pages.signIn.label.userId}
                  name='userId'
                  rules={[
                    {
                      required: true,
                      pattern: getTrimNonEmptyRegExp(),
                      message: t.pages.signIn.msg.userId_empty,
                    },
                  ]}
                >
                  <Input prefix={<IdcardOutlined />} placeholder={t.pages.signIn.placeholder.userId} allowClear />
                </Form.Item>

                <Form.Item
                  label={t.pages.signIn.label.password}
                  name='password'
                  rules={[
                    {
                      required: true,
                      pattern: getTrimNonEmptyRegExp(),
                      message: t.pages.signIn.msg.password_empty,
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder={t.pages.signIn.placeholder.password}
                    allowClear
                  />
                </Form.Item>

                <Form.Item>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>{t.pages.signIn.label.rememberId}</Checkbox>
                  </Form.Item>

                  <a className='reset-password' href=''>
                    {t.pages.signIn.label.resetPassword}
                  </a>
                </Form.Item>
                <Divider />

                <Form.Item>
                  <Button
                    ref={ref2}
                    type='primary'
                    htmlType='submit'
                    role={"sign-in-btn"}
                    block
                    loading={spinning?.signIn}
                  >
                    <AXFIArrowLogIn fontSize={20} />
                    {t.button.signIn}
                  </Button>
                </Form.Item>
              </Form>
            </SignInBoxBody>
            <SignInBoxFooter>
              <div>
                <LangSelector />
              </div>
              {process.env.API_PHASE !== "production" && (
                <div>
                  API TEST &nbsp;
                  <Switch
                    checked={isApiTest}
                    onChange={(checked) => {
                      sessionStorage.setItem("isApiTest", checked ? "T" : "F");
                      window.location.reload();
                    }}
                  />
                </div>
              )}
            </SignInBoxFooter>
          </SignInFormBox>
        </SignInBox>
      </SignInContainer>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
}

const SignInContainer = styled.div`
  ${SMixinFlexColumn("center", "center")};
  flex: 1;
  overflow: auto;
  background: url("/signin-background.jpg") no-repeat center center;
  background-size: cover;
  .reset-password {
    float: right;
  }
  .ant-input-affix-wrapper {
    box-sizing: border-box;
    border-radius: 5px;
    padding: 4px 10px;

    .ant-input-prefix {
      margin-right: 6px;
    }

    .ant-input {
      font-weight: 400;
      line-height: 30px;
      padding-left: 8px;
    }

    .ant-input-suffix {
      .ant-input-password-icon {
        margin-left: 4px;
      }
    }
  }

  [role="sign-in-btn"] {
    height: 40px;
    ${SMixinFlexRow("center", "center")};
    column-gap: 5px;
  }
`;

const SignInBox = styled.div`
  width: 800px;
  height: 500px;
  background: rgba(245, 245, 245, 1);
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  ${SMixinFlexRow("stretch", "stretch")};
  overflow: hidden;
`;

const SignInVisual = styled.div`
  width: 400px;
  height: 500px;
  background: url("/signin-visual.jpg") no-repeat center center;
  background-size: cover;
`;

const SignInFormBox = styled.div`
  flex: 1;
  ${SMixinFlexColumn("stretch", "stretch")};
`;

const SignInLogo = styled.div`
  width: 400px;
  height: 96px;
  background: url("/logo.png") no-repeat center center;
  background-size: 50%;
`;

const SignInBoxBody = styled.div`
  padding: 20px 32px;
  flex: 1;

  .ant-form-vertical {
    .ant-form-item-label {
      padding-bottom: 5px;
      > label {
        font-weight: 700;
      }
    }
  }
  .ant-form-item {
    margin-bottom: 18px;
  }
`;
const SignInBoxFooter = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  padding: 20px 32px;
  color: #4c4c4c;
`;

export default App;
