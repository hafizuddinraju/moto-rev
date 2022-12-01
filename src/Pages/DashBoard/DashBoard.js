import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthDataContext } from '../../AuthContext/AuthContext';
import MediumSpinner from '../../components/Spinner/MediumSpinner';
import useAdmin from '../../hooks/useAdmin';
import useBuyer from '../../hooks/userBuyer';
import useSeller from '../../hooks/useSeller';

import Navbar from '../../Shared/Navbar/Navbar';


const DashBoard = () => {
  const { user} = useContext(AuthDataContext);
  const [isAdmin] = useAdmin(user?.email)
  const [isSeller] = useSeller(user?.email)
  const [isBuyer] = useBuyer(user?.email)

  if(!isAdmin && !isBuyer && !isSeller){
    return <MediumSpinner></MediumSpinner>
  }
  
    return (
        
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <Outlet></Outlet>
    
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
     
      {
        isAdmin && 

        <>
        
        <li><Link to='/dashboard/allSeller'>All Seller</Link></li>
        <li><Link to='/dashboard/allbuyer'>All Buyer</Link></li>
        <li><Link to='/dashboard/allProducts'>All Products</Link></li>
        <li><Link to='/dashboard/reportedItem'>Reported Items</Link></li>
        </>
        

      }
      {
        isSeller && 

        <>
        
        <li><Link to='/dashboard/seller/myproduct'>My Product</Link></li>
        <li><Link to='/dashboard/seller/addproduct'>Add A Product</Link></li>
        <li><Link to='/dashboard/seller/mybuyer'>My Buyer</Link></li>
        </>
        

      }
      {
        isBuyer && 

        <>
        
        <li><Link to='/dashboard/buyer/myorder'>My Orders</Link></li>
        
        </>
        

      }
      
    </ul>
  
  </div>
        </div>
        </div>
    );
};

export default DashBoard;