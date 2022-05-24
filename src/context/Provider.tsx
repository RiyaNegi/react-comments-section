import React, { createContext, useEffect, useState } from 'react'
const { v4: uuidv4 } = require('uuid')
import _ from 'lodash'

export const GlobalContext = createContext({})

export const GlobalProvider = ({
  children,
  currentUser,
  replyTop,
  customImg,
  inputStyle,
  formStyle,
  submitBtnStyle,
  cancelBtnStyle,
  imgStyle,
  commentsCount,
  commentData,
  onSubmitAction,
  onDeleteAction,
  onReplyAction,
  onEditAction
}: any) => {
  const [currentUserData] = useState(currentUser)
  const [data, setData] = useState<
    Array<{
      userId: string
      comId: string
      fullName: string
      avatarUrl: string
      text: string
      userProfile?: string
      replies?:
        | Array<{
            userId: string
            comId: string
            fullName: string
            avatarUrl: string
            text: string
            userProfile?: string
          }>
        | undefined
    }>
  >([])
  const [editArr, setEdit] = useState<string[]>([])
  const [replyArr, setReply] = useState<string[]>([])

  useEffect(() => {
    setData(commentData)
  }, [commentData])

  const handleAction = (id: string, edit: boolean) => {
    if (edit) {
      let editArrCopy: string[] = [...editArr]
      let indexOfId = _.indexOf(editArrCopy, id)
      if (_.includes(editArr, id)) {
        editArrCopy.splice(indexOfId, 1)
        setEdit(editArrCopy)
      } else {
        editArrCopy.push(id)
        setEdit(editArrCopy)
      }
    } else {
      let replyArrCopy: string[] = [...replyArr]
      let indexOfId = _.indexOf(replyArrCopy, id)
      if (_.includes(replyArr, id)) {
        replyArrCopy.splice(indexOfId, 1)
        setReply(replyArrCopy)
      } else {
        replyArrCopy.push(id)
        setReply(replyArrCopy)
      }
    }
  }

  const onSubmit = (text: string) => {
    let copyData = [...data]
    copyData.push({
      userId: currentUserData.currentUserId,
      comId: uuidv4(),
      avatarUrl: currentUserData.currentUserImg,
      userProfile: currentUserData.currentUserProfile
        ? currentUserData.currentUserProfile
        : null,
      fullName: currentUserData.currentUserFullName,
      text: text,
      replies: []
    })
    setData(copyData)
  }

  const onEdit = (text: string, comId: string, parentId: string) => {
    let copyData = [...data]
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId })
      const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
        comId: comId
      })
      copyData[indexOfParent].replies![indexOfId].text = text
      setData(copyData)
      handleAction(comId, true)
    } else {
      const indexOfId = _.findIndex(copyData, { comId: comId })
      copyData[indexOfId].text = text
      setData(copyData)
      handleAction(comId, true)
    }
  }

  const onReply = (text: string, comId: string, parentId: string) => {
    let copyData = [...data]
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId })
      copyData[indexOfParent].replies!.push({
        userId: currentUserData.currentUserId,
        comId: uuidv4(),
        avatarUrl: currentUserData.currentUserImg,
        userProfile: currentUserData.currentUserProfile
          ? currentUserData.currentUserProfile
          : null,
        fullName: currentUserData.currentUserFullName,
        text: text
      })
      setData(copyData)
      handleAction(comId, false)
    } else {
      const indexOfId = _.findIndex(copyData, {
        comId: comId
      })
      copyData[indexOfId].replies!.push({
        userId: currentUserData.currentUserId,
        comId: uuidv4(),
        avatarUrl: currentUserData.currentUserImg,
        userProfile: currentUserData.currentUserProfile
          ? currentUserData.currentUserProfile
          : null,
        fullName: currentUserData.currentUserFullName,
        text: text
      })
      setData(copyData)
      handleAction(comId, false)
    }
  }

  const onDelete = (comId: string, parentId: string) => {
    let copyData = [...data]
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId })
      const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
        comId: comId
      })
      copyData[indexOfParent].replies!.splice(indexOfId, 1)
      setData(copyData)
    } else {
      const indexOfId = _.findIndex(copyData, { comId: comId })
      copyData.splice(indexOfId, 1)
      setData(copyData)
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        currentUserData: currentUserData,
        replyTop: replyTop,
        data: data,
        handleAction: handleAction,
        editArr: editArr,
        onSubmit: onSubmit,
        onEdit: onEdit,
        replyArr: replyArr,
        onReply: onReply,
        onDelete: onDelete,
        customImg: customImg,
        inputStyle: inputStyle,
        formStyle: formStyle,
        submitBtnStyle: submitBtnStyle,
        cancelBtnStyle: cancelBtnStyle,
        imgStyle: imgStyle,
        commentsCount: commentsCount,
        onSubmitAction: onSubmitAction,
        onDeleteAction: onDeleteAction,
        onReplyAction: onReplyAction,
        onEditAction: onEditAction
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
