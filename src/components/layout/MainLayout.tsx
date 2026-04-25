import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

const MainLayout = () => {
    return <>
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-1 flex items-center justify-center border-b border-gray-300 mb-6">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    </>
};
export default MainLayout;