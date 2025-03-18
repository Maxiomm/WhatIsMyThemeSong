import React, { createContext, useState, useContext } from "react";
import LoadingIndicator from "../components/LoadingIndicator";

const LoadingContext = createContext({
  loading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {/* L'indicateur de chargement est rendu ici, au niveau de l'app */}
      {loading && <LoadingIndicator />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
