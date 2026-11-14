import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Weather from '../pages/weather';

const routes = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: "/weather",
                element: <Weather />
            }
        ]
    }
]);

export default routes;
