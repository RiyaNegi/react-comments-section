/* eslint-disable prettier/prettier */

import React, { createContext } from "react";

export const ActionContext = createContext()

export const ActionProvider = ({ children }) => {
    const handleReply = () => { console.log("reply called") }

    const handleCancel = () => { console.log("cancel called") }

    return (
        <ActionContext.Provider
            value={{
                handleReply: handleReply,
                handleCancel: handleCancel
            }}
        >
            {children}
        </ActionContext.Provider>

    );
};
