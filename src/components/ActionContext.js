import React, { createContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'

export const ActionContext = createContext()
export const ActionProvider = ({
  children,
  currentUser,
  setComment,
  comments,
  signinUrl,
  signupUrl,
  customInput
}) => {
  const [replies, setReplies] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    if (currentUser) {
      console.log('1 called')
      setUser(true)
    } else {
      console.log('2 called')
      setUser(false)
    }
  })

  const handleReply = (id) => {
    setReplies([...replies, id])
  }
  const handleCancel = (id) => {
    const list = [...replies]
    const newList = list.filter((i) => i !== id)
    setReplies(newList)
  }

  const onSubmit = (text, parentId, child) => {
    if (text.length > 0) {
      if (!parentId && !child) {
        setComment([
          ...comments,
          {
            userId: currentUser.userId,
            comId: uuid(),
            avatarUrl: currentUser.avatarUrl,
            fullName: currentUser.name,
            text: text
          }
        ])
      } else if (parentId && child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        newList[index].replies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text
        })
        setComment(newList)
      } else if (parentId && !child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        const newReplies =
          newList[index].replies === undefined
            ? []
            : [...newList[index].replies]
        newReplies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text
        })
        newList[index].replies = newReplies
        setComment(newList)
      }
    }
  }

  const editText = (id, text, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === id)
      newList[index].text = text
      setComment(newList)
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const replyIndex = newList[index].replies.findIndex((i) => i.comId === id)
      newList[index].replies[replyIndex].text = text
      setComment(newList)
    }
  }

  const deleteText = (id, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const filter = newList.filter((x) => x.comId !== id)
      setComment(filter)
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const filter = newList[index].replies.filter((x) => x.comId !== id)
      newList[index].replies = filter
      setComment(newList)
    }
  }

  return (
    <ActionContext.Provider
      value={{
        onSubmit: onSubmit,
        userImg: currentUser && currentUser.avatarUrl,
        userId: currentUser && currentUser.userId,
        handleReply: handleReply,
        handleCancel: handleCancel,
        replies: replies,
        setReplies: setReplies,
        onEdit: editText,
        onDelete: deleteText,
        signinUrl: signinUrl,
        signupUrl: signupUrl,
        user: user,
        customInput: customInput
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
