import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
axios.defaults.baseURL = baseURL;

console.log("API Base URL:", baseURL);

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [cars, setCars] = useState([]);

    // Function to check if user is logged in
    const fetchUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                setIsOwner(false);
                return;
            }
            
            // Set the token for axios requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const { data } = await axios.get('/api/user/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
                setToken(token);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            if (error.response?.status === 401) {
                logout();
                toast.error('Session expired. Please login again.');
            }
        }
    }, []);

    // Function to fetch all cars
    const fetchCars = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            if (data.success) {
                setCars(data.cars);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    }, []);

    // Function to logout user
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        delete axios.defaults.headers.common['Authorization'];
        toast.success("Logged out successfully");
        navigate('/');
    }, [navigate]);

    // Set up axios headers when token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    // Initialize app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            fetchUser();
        }
        fetchCars();
    }, [fetchUser, fetchCars]);

    const value = {
        token,
        navigate,
        user,
        setUser,
        isOwner,
        setIsOwner,
        showLogin,
        setShowLogin,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        cars,
        setCars,
        fetchUser,
        fetchCars,
        logout,
        setToken,
        axios // Add axios to context
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};