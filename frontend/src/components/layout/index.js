import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/index';

export default function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}