import React, { createContext, useEffect, useState } from "react";
import data from "../../../example/src/data.json";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: any) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
