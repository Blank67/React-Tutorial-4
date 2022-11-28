import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: () => { }
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const loginHandler = (email, password) => {
        localStorage.setItem('isloggedin', '1');
        setIsLoggedIn(true);
    };
    const logoutHandler = () => {
        localStorage.removeItem('isloggedin');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const userLogInInfo = localStorage.getItem('isloggedin');
        if (userLogInInfo === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    return (<AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>{props.children}</AuthContext.Provider>);
};

export default AuthContext;