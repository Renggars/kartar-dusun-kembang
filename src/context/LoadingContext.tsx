// context/LoadingContext.tsx
"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface LoadingContextType {
  isMarketplaceReady: boolean;
  setMarketplaceReady: (ready: boolean) => void;

  isActivitiesReady: boolean;
  setActivitiesReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMarketplaceReady, setIsMarketplaceReady] = useState(false);
  const [isActivitiesReady, setIsActivitiesReady] = useState(false);

  const contextValue = useMemo(
    () => ({
      isMarketplaceReady,
      setMarketplaceReady: setIsMarketplaceReady,

      isActivitiesReady,
      setActivitiesReady: setIsActivitiesReady,
    }),
    [isMarketplaceReady, isActivitiesReady] // Dependency array diperbarui
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};
