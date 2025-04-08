// import { createContext, useEffect, useReducer } from "react";

// const INITIAL_STATE = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   loading: false,
//   error: null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.user));
//   }, [state.user]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         loading: state.loading,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs
      // {
      //   withCredentials: true,
      // }
    );

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
