import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthDataContext } from '../../AuthContext/AuthContext';

import MediumSpinner from '../../components/Spinner/MediumSpinner';
import useSeller from '../../hooks/useSeller';

const SellerRoute = ({children}) => {
    const {user, loading} = useContext(AuthDataContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email) 
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <MediumSpinner></MediumSpinner>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;