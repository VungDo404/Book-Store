import FooterComponent from "../Footer/footer";
import HeaderComponent from "../Header/header";
import { Outlet } from "react-router-dom";

export default function Index(){
    return (
        <div style={{display:"flex", flexDirection:"column", height: '100dvh', width:"100vw"}}>
            <HeaderComponent/>
            <Outlet/>
            <FooterComponent/>
        </div>
    );
}