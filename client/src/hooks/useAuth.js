import React, { useContext } from "react";
import AuthContext from "../components/AuthContext";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return useContext(AuthContext);
};

export default useAuth;
