import { ShoppingCartOutlined, InfoCircleOutlined, BookTwoTone } from '@ant-design/icons';
import { Menu, Input, Typography, Col, MenuProps, Dropdown, FloatButton, Avatar, Badge } from 'antd';
import { SearchProps } from 'antd/es/input';
import { Link } from 'react-router-dom';
import '@/styles/header.scss'

const { Text } = Typography;

const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value: string, _e:React.SyntheticEvent, info: any) => {
    
};
const items: MenuProps['items'] = [
    {
      label: <Text><Link to="/login" className="nav-text">Login</Link></Text>,
      key: '0',
    },
    {
      label: <Text><Link to="/login" className="nav-text">Register</Link></Text>,
      key: '1',
    },
  ];
export default function HeaderComponent(){
    return (
        
        <Menu theme="light" style={{width:"100%"}} >
            <Col className='header-container'>
                <Col xs={{  offset: 1, span: 4 }} md={{  offset: 1, span: 2 }}> 
                    <div className='book'>
                        <span>
                            <BookTwoTone style={{ fontSize: '200%'}} />
                            &#160;THE BOOK
                        </span>
                    </div>
                </Col>
                <Col xs={{  offset: 0, span: 14 }} md={{  offset: 0, span: 10 }}>
                    <Search size={'large'} placeholder="input search text" onSearch={onSearch} />
                </Col>
                <Col xs={{  offset: 3, span: 6 }} md={{  offset: 5, span: 3 }}>
                <div className='icon'>
                    <Badge count={5}>
                        <Avatar 
                            icon={<ShoppingCartOutlined/>} 
                            style={{ 
                                fontSize: '200%',
                                color:'rgb(37, 172, 172)',
                                backgroundColor: "rgb(249, 250, 255)"
                            }} 
                            size={31}
                        />
                    </Badge>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                        <div className='account'>
                            <span>
                                <InfoCircleOutlined 
                                    style={{ 
                                        fontSize: '200%', 
                                        color:'rgb(37, 172, 172)',
                                    }}
                                />
                                
                            </span>
                            <span style={{verticalAlign:'super'}} > Account</span>
                        </div>
                        </a>
                    </Dropdown>
                </div>
                </Col>
            </Col>
        </Menu>
        
    );
}