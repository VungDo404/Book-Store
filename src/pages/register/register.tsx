import { Button, Form, Input, Typography, message, notification, Col } from 'antd';
import 'styles/register.scss';
import { register } from "@/services/auth"; 
import { Link, useNavigate } from "react-router-dom";

export interface interface_register_request {
  fullName: string;
  password: string;
  email: string;
  phone?: string;
  role?: string
};

export interface interface_register_response {
  statusCode: number, 
  message: string,
  data: {
    _id: string, 
    email: string, 
    fullName: string
  },
  author: string
}

const { Title, Text } = Typography;


export default function Register(){
    const navigate = useNavigate(); 
  const onFinish = async (values: interface_register_request) => {
    try {
      const result: interface_register_response  = (await register(values)).data; 
      if(result?.statusCode === 201){
        
        navigate('/login');
        message.success({
          content: 'Register user successfully',
        });
      }
        
    } catch (error: any) {
        console.log(error)
        notification.error({
          message: error?.message
        });
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

    return (
        <div className='register-container' style={{textAlign:'center'}} >
            <Form
                name="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size={"large"}
                style={{
                  boxShadow: '0 6px 15px 0 rgba(7, 4, 190, 0.3)',
                  borderRadius: '3%',
                  backgroundColor: 'rgba(255,255,255,0.3)'}}
                layout={'vertical'}
            >
                <Title level={3}>REGISTER</Title>
                <Col xs={{  offset: 2, span: 20 }} md={{  offset: 1, span: 21 }}>
                <Form.Item<interface_register_request>
                label="Full name"
                name="fullName"
                rules={[{ required: true, message: 'Please input your name!' }]}
                required tooltip="This is a required field"
                >
                <Input />
                </Form.Item>
                </Col>
                <Col xs={{  offset: 2, span: 20 }} md={{  offset: 1, span: 21 }}>
                  <Form.Item<interface_register_request>
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                  required tooltip="This is a required field"
                  >
                  <Input />
                  </Form.Item>
                </Col>
                <Col xs={{  offset: 2, span: 20 }} md={{ offset: 1, span: 21 }}>
                  <Form.Item<interface_register_request>
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone!' }]}
                  >
                  <Input />
                  </Form.Item>
                </Col>
                <Col xs={{  offset: 2, span: 20 }} md={{ offset: 1, span: 21 }}>
                  <Form.Item<interface_register_request>
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  required tooltip="This is a required field"
                  >
                  <Input.Password />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} md={{ span: 8, offset: 8 }}>
                  <Form.Item >
                  <Button 
                      type="primary" 
                      htmlType="submit"
                      size={"large"}
                      ghost
                      block
                      style={{
                          fontSize:'1.2rem', 
                          fontWeight: 'lighter'
                      }}
                  >
                      Submit
                  </Button>
                  </Form.Item>
                </Col>
                <Text>
                    If you already have an account.
                    <Link to='/login' style={{ fontStyle: 'italic' }}> Sign in</Link>
                </Text>
            </Form>  
        </div>
  );
    
}