import axios from "axios";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const AdminContext = createContext();

export const useGlobalAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const isMounted = useRef(true); // Prevents unnecessary re-fetching

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/get-users`
      );
      if (isMounted.current) {
        setUsers(data); // Store users in state
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();

    return () => {
      isMounted.current = false; // Cleanup to avoid memory leaks
    };
  }, []);

  const value = {
    users,
    getUsers,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
