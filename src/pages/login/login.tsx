import { login } from '@/services/auth';
import { Button, message, Form, Input, notification, Typography, Col } from 'antd';
import 'styles/login.scss'
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from '@/redux/hooks/hooks';
import { userAction } from '@/redux/slices/accountReducer';

export interface interface_login_request {
    username?: string;
    password?: string;
};
export interface interface_login_response {
    statusCode: number,
    message: string,
    data: {
        access_token: string,
        user: {
            email: string,
            phone: string,
            fullName: string,
            role: string,
            avatar: string,
            id: string
        }
    },
    author: string
}

const { Title, Text } = Typography;


export default function Login(){
    const navigate = useNavigate(); 
    const dispatch = useAppDispatch(); 
    

        const onFinish = async (values: interface_login_request) => {
        try {
            const result: interface_login_response  = (await login(values)).data; 
            if(result.statusCode === 201){
                localStorage.setItem('access_token',result.data.access_token);
                dispatch(userAction(result.data.user));
                message.success({
                    content: 'Login successfully',
                });
                
                navigate('/');
            }
        } catch (error: any) {
            console.log(error)
            notification.error({
                message: error.message
            });
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-container' style={{textAlign:'center'}}>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size={'large'}
                autoComplete="off"
                style={{
                    boxShadow: '0 6px 15px 0 rgba(7, 4, 190, 0.3)',
                    borderRadius: '3%',
                    backgroundColor: 'rgba(255,255,255,0.3)'
                }}
                layout='vertical'
            >
                <Title level={3}>LOGIN</Title>
                <Col xs={{  offset: 2, span: 20 }} md={{  offset: 1, span: 21 }}>
                    <Form.Item<interface_login_request>
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                    </Form.Item>
                </Col>
                <Col xs={{  offset: 2, span: 20 }} md={{  offset: 1, span: 21 }}>
                    <Form.Item<interface_login_request>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} md={{ span: 8, offset: 8 }} >
                <Form.Item >
                <Button 
                    type="primary" 
                    htmlType="submit"
                    ghost
                    block
                    style={{
                        fontSize:'1.2rem', 
                        padding: '0.2em 0.2em',
                        
                        fontWeight: 'lighter'
                    }}
                >
                    Submit
                </Button>
                </Form.Item>
                </Col>
                <Text>
                    Don't have an account yet? 
                    <Link to='/register' style={{ fontStyle: 'italic' }}> Create one</Link>
                </Text>
            </Form>  
        </div>  
        
    );
}