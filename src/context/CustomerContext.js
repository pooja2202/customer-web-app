import React, { createContext, useState, useEffect, useContext } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(() => {
    const storedCustomer = localStorage.getItem("customer");
    return storedCustomer ? JSON.parse(storedCustomer) : null;
  });

  useEffect(() => {
    localStorage.setItem("customer", JSON.stringify(customer));
  }, [customer]);

  const login = (customerData) => {
    setCustomer(customerData);
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem("customer");
  };

  return (
    <CustomerContext.Provider value={{ customer, login, logout }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  return useContext(CustomerContext);
};
