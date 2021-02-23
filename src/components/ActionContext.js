/* eslint-disable prettier/prettier */

import React, { createContext, useState } from "react";

export const ActionContext = createContext()

export const ActionProvider = ({ children, onSubmit, currentUser, onEdit, onDelete }) => {

    const [replies, setReplies] = useState([])
    const handleReply = (id) => {
        setReplies([...replies, id])
    }
    const handleCancel = (id) => {
        const list = [...replies]
        const newList = list.filter(i => i !== id)
        setReplies(newList)
    }

    return (
        <ActionContext.Provider
            value={{
                onSubmit: onSubmit,
                userImg: currentUser.avatarUrl,
                userId: currentUser.userId,
                handleReply: handleReply,
                handleCancel: handleCancel,
                replies: replies,
                setReplies: setReplies,
                onEdit: onEdit,
                onDelete: onDelete
            }}
        >
            {children}
        </ActionContext.Provider>

    );
};
