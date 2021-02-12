/* eslint-disable prettier/prettier */

import React, { createContext } from "react";

export const ActionContext = createContext()

export const ActionProvider = ({ children, onSubmit, currentUser }) => {

    return (
        <ActionContext.Provider
            value={{
                onSubmit: onSubmit,
                userImg: currentUser.avatarUrl,
                userId: currentUser.userId
            }}
        >
            {children}
        </ActionContext.Provider>

    );
};
