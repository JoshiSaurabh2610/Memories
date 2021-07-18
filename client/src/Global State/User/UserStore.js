import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';


const UserStore = ({children}) => {
    const [User,dispatch] = useReducer(UserReducer,[]);

    return (
        <UserContext.Provider value={{
            
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserStore
