import Footer from "../Footer/footer";
import Header from "../Header/header";
import { Outlet } from "react-router-dom";

export default function Index(){
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}