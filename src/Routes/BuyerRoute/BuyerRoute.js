import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthDataContext } from '../../AuthContext/AuthContext';
import MediumSpinner from '../../components/Spinner/MediumSpinner';
import useBuyer from '../../hooks/userBuyer';

const BuyerRoute = ({children}) => {
    const {user, loading} = useContext(AuthDataContext)
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email) 
    const location = useLocation();

    if (loading || isBuyerLoading) {
        return <MediumSpinner></MediumSpinner>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;