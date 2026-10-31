import { Outlet } from 'react-router';

export default function MainLayout() {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Outlet />
        </div>
    );
}
