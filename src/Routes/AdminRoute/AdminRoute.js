import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthDataContext } from '../../AuthContext/AuthContext';
import MediumSpinner from '../../components/Spinner/MediumSpinner';
import useAdmin from '../../hooks/useAdmin';




const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthDataContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <MediumSpinner></MediumSpinner>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;