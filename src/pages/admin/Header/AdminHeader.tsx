import { Button, Dropdown, Layout, MenuProps, Typography } from "antd";
import {
    InfoCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import 'styles/AdminHeader.scss'
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks/hooks";

const { Header } = Layout;
const { Text } = Typography;

interface interface_AdminHeader_props{
    collapsed: boolean, 
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const itemsNotAuth: MenuProps['items'] = [
    {
        label: <Text ><Link to="/login" className="nav-text">Login</Link></Text>,
        key: '0',
    },
    {
        label: <Text><Link to="/register" className="nav-text">Register</Link></Text>,
        key: '1',
    },
];
export const itemsAuthAdmin: MenuProps['items'] = [
    {
        label: <Text><Link to="/admin" className="nav-text">Admin</Link></Text>,
        key: '0',
        
        
    },
    {
        label: <Text><Link to="/logout" className="nav-text">Logout</Link></Text>,
        key: '1',
    },
];
export default function AdminHeader(props: interface_AdminHeader_props){
    const { collapsed, setCollapsed } = props;
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated); 
    return (
        <Header className='admin-header-container'>
            <div className="header-element">
                <Button
                    className='toggle'
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '1.2rem',
                    }}
                />
            </div>
            <div className="header-element">
                <Dropdown menu={{ items: isAuthenticated ? itemsAuthAdmin : itemsNotAuth  }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <span>
                            <InfoCircleOutlined 
                                style={{ 
                                    fontSize: '2rem', 
                                    color:'rgb(37, 172, 172)',
                                }}
                            />
                        </span>
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
}