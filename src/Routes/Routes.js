import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Blog from '../components/Blog/Blog';
import Main from '../layout/Main';
import AddProduct from '../Pages/DashBoard/AddProduct/AddProduct';
import AllBuyer from '../Pages/DashBoard/AllBuyer/AllBuyer';
import AllProducts from '../Pages/DashBoard/AllProducts/AllProducts';
import AllSeller from '../Pages/DashBoard/AllSeller/AllSeller';
import DashBoard from '../Pages/DashBoard/DashBoard';
import MyBuyer from '../Pages/DashBoard/MyBuyer/MyBuyer';
import MyOrders from '../Pages/DashBoard/MyOrders/MyOrders';
import MyProduct from '../Pages/DashBoard/MyProduct/MyProduct';
import Payment from '../Pages/DashBoard/Payment/Payment';
import ReportItem from '../Pages/DashBoard/ReportItem/ReportItem';
import ShowDashBoard from '../Pages/DashBoard/ShowDashBoard/ShowDashBoard';
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import SingleCategory from '../Pages/SingleCategory/SingleCategory';
import ViewProduct from '../Pages/ViewProduct/ViewProduct';
import ErrorPage from '../Shared/ErrorPage/ErrorPage';
import AdminRoute from './AdminRoute/AdminRoute';
import BuyerRoute from './BuyerRoute/BuyerRoute';
import PrivateRoute from './PrivateRoute';
import SellerRoute from './SellerRoute/SellerRoute';

export const router = createBrowserRouter([
    {path: '/', element:<Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {path:'/', element: <Home></Home>},
        {path:'/home', element: <Home></Home>},
        {path:'/login', element: <Login></Login>},
        {path:'/signup', element: <Signup></Signup>},
        {path:'/blog', element: <Blog></Blog>},
        {path:'/category/:name', element: <PrivateRoute><SingleCategory></SingleCategory></PrivateRoute> },
        {path:'/viewProduct/:id', element: <PrivateRoute><ViewProduct></ViewProduct> </PrivateRoute> },

        
    ]
},
{path:'/dashboard', element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
children:[
    {path:'/dashboard', element:<ShowDashBoard></ShowDashBoard>},
    {path:'/dashboard/allSeller', element:<AdminRoute><AllSeller></AllSeller></AdminRoute> },
    {path:'/dashboard/allbuyer', element:<AdminRoute><AllBuyer></AllBuyer></AdminRoute> },
    {path:'/dashboard/allProducts', element:<AdminRoute><AllProducts></AllProducts> </AdminRoute> },
    {path:'/dashboard/reportedItem', element:<AdminRoute><ReportItem></ReportItem> </AdminRoute> },
    {path:'/dashboard/seller/myproduct', element:<SellerRoute><MyProduct></MyProduct></SellerRoute> },
    {path:'/dashboard/seller/addproduct', element:<SellerRoute><AddProduct></AddProduct></SellerRoute> },
    {path:'/dashboard/seller/mybuyer', element:<SellerRoute><MyBuyer></MyBuyer> </SellerRoute> },
    {path:'/dashboard/buyer/myorder', element:<BuyerRoute><MyOrders></MyOrders> </BuyerRoute> },
    {path:'/dashboard/myorders/payment/:id', 
    element:<Payment></Payment>
    
}

]
}

])