import { Avatar, Button, Dropdown, Layout, MenuProps, Typography } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import 'styles/AdminHeader.scss'
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { handleLogout } from "@/redux/slices/accountReducer";

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

export default function AdminHeader(props: interface_AdminHeader_props){
    const { collapsed, setCollapsed } = props;
    const navigate = useNavigate(); 
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated); 
    const avatarName = useAppSelector(state => state.account.user.avatar) ?? '';
    const  avatarPath = `${import.meta.env.VITE_API_URL}/images/avatar/${avatarName}`; 
    const itemsAuthAdmin: MenuProps['items'] = [
        {
            label: <Text><Link to="/admin" className="nav-text">Admin</Link></Text>,
            key: '0',
            
            
        },
        {
            label: <Text>Logout</Text>,
            key: '1',
            onClick: () => {
                
                dispatch(handleLogout());
                navigate('/');
            }
        },
    ];
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
                        <Avatar icon={<UserOutlined />} src={avatarPath} />
                        </span>
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
}