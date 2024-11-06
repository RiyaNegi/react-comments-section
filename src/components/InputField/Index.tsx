import './InputField.scss'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/Provider'
import React from 'react'
const { v4: uuidv4 } = require('uuid')
import RegularInput from './RegularInput'
import AdvancedInput from './AdvancedInput'

interface InputFieldProps {
  formStyle?: object
  comId?: string
  fillerText?: string
  parentId?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
  placeHolder?: string
  mentions?: any[]
  tags?: string[]
}

const InputField = ({
  formStyle,
  comId,
  fillerText,
  parentId,
  mode,
  customImg,
  inputStyle,
  cancelBtnStyle,
  submitBtnStyle,
  imgStyle,
  imgDiv,
  placeHolder,
  mentions,
  tags
}: InputFieldProps) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (fillerText) {
      setText(fillerText)
    }
  }, [fillerText])

  const globalStore: any = useContext(GlobalContext)

  const editMode = async (advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onEdit(textToSend, comId, parentId),
      globalStore.onEditAction &&
        (await globalStore.onEditAction({
          userId: globalStore.currentUserData.currentUserId,
          comId: comId,
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile
            ? globalStore.currentUserData.currentUserProfile
            : null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,
          parentOfEditedCommentId: parentId
        }))
    )
  }

  const replyMode = async (replyUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onReply(textToSend, comId, parentId, replyUuid),
      globalStore.onReplyAction &&
        (await globalStore.onReplyAction({
          userId: globalStore.currentUserData.currentUserId,
          repliedToCommentId: comId,
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile
            ? globalStore.currentUserData.currentUserProfile
            : null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,
          parentOfRepliedCommentId: parentId,
          comId: replyUuid
        }))
    )
  }
  const submitMode = async (createUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onSubmit(textToSend, createUuid),
      globalStore.onSubmitAction &&
        (await globalStore.onSubmitAction({
          userId: globalStore.currentUserData.currentUserId,
          comId: createUuid,
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile
            ? globalStore.currentUserData.currentUserProfile
            : null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,
          timestamp: new Date().toISOString(),  // Timestamp should be officially now at the time of saving, not the time of creation
          replies: []
        }))
    )
  }

  const handleSubmit = async (event: any, advText?: string) => {
    event.preventDefault()
    const createUuid = uuidv4()
    const replyUuid = uuidv4()
    mode === 'editMode'
      ? editMode(advText)
      : mode === 'replyMode'
      ? replyMode(replyUuid, advText)
      : submitMode(createUuid, advText)
    setText('')
  }

  return (
    <div>
      {globalStore.advancedInput ? (
        <AdvancedInput
          handleSubmit={handleSubmit}
          text={mode === 'editMode' ? text : ''}
          formStyle={formStyle}
          mode={mode}
          cancelBtnStyle={cancelBtnStyle}
          submitBtnStyle={submitBtnStyle}
          comId={comId}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          placeHolder={placeHolder}
        />
      ) : (
        <RegularInput
          formStyle={formStyle}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          mode={mode}
          inputStyle={inputStyle}
          cancelBtnStyle={cancelBtnStyle}
          comId={comId}
          submitBtnStyle={submitBtnStyle}
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          placeHolder={placeHolder}
          mentions={mentions}
          tags={tags}
        />
      )}
    </div>
  )
}
export default InputField
