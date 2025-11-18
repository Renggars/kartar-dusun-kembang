// context/LoadingContext.tsx
"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface LoadingContextType {
  isHeroReady: boolean;
  isAboutReady: boolean;
  isActivitiesReady: boolean;
  isMarketplaceReady: boolean;

  // Fungsi Setter
  setHeroReady: (ready: boolean) => void;
  setAboutReady: (ready: boolean) => void;
  setActivitiesReady: (ready: boolean) => void;
  setMarketplaceReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [isAboutReady, setIsAboutReady] = useState(false);
  const [isActivitiesReady, setIsActivitiesReady] = useState(false);
  const [isMarketplaceReady, setIsMarketplaceReady] = useState(false); // <<< BARU

  const contextValue = useMemo(
    () => ({
      isHeroReady,
      isAboutReady,
      isActivitiesReady,
      isMarketplaceReady,
      setHeroReady: setIsHeroReady,
      setAboutReady: setIsAboutReady,
      setActivitiesReady: setIsActivitiesReady,
      setMarketplaceReady: setIsMarketplaceReady,
    }),
    [isHeroReady, isAboutReady, isActivitiesReady, isMarketplaceReady]
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
