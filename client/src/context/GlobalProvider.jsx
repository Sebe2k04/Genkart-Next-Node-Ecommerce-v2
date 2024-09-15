"use client";
import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();


const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPice: 0,
    maxPrice: 1000000,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [userData, setUserData] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        products,
        setProducts,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        pagination,
        setPagination,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;


export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if(!context){
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context
};
