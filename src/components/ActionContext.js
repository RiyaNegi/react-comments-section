/* eslint-disable prettier/prettier */

import React, { createContext } from "react";

export const ActionContext = createContext()

export const ActionProvider = ({ children, onSubmit }) => {

    return (
        <ActionContext.Provider
            value={{
                onSubmit: onSubmit
            }}
        >
            {children}
        </ActionContext.Provider>

    );
};
