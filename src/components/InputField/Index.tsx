import './InputField.scss'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/Provider'
import React from 'react'
const { v4: uuidv4 } = require('uuid')
import EmojiInput from './EmojiInput'

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
  imgDiv
}: InputFieldProps) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (fillerText) {
      setText(fillerText)
    }
  }, [fillerText])

  const globalStore: any = useContext(GlobalContext)

  const editMode = async () => (
    await globalStore.onEdit(text, comId, parentId),
    globalStore.onEditAction &&
      (await globalStore.onEditAction({
        userId: globalStore.currentUserData.currentUserId,
        comId: comId,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: text,
        parentOfEditedCommentId: parentId
      }))
  )

  const replyMode = async (replyUuid: string) => (
    await globalStore.onReply(text, comId, parentId, replyUuid),
    globalStore.onReplyAction &&
      (await globalStore.onReplyAction({
        userId: globalStore.currentUserData.currentUserId,
        repliedToCommentId: comId,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: text,
        parentOfRepliedCommentId: parentId,
        comId: replyUuid
      }))
  )
  const submitMode = async (createUuid: string) => (
    await globalStore.onSubmit(text, createUuid),
    globalStore.onSubmitAction &&
      (await globalStore.onSubmitAction({
        userId: globalStore.currentUserData.currentUserId,
        comId: createUuid,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: text,
        replies: []
      }))
  )

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const createUuid = uuidv4()
    const replyUuid = uuidv4()
    mode === 'editMode'
      ? editMode()
      : mode === 'replyMode'
      ? replyMode(replyUuid)
      : submitMode(createUuid)
    setText('')
  }

  return (
    <div>
      <form
        className='form'
        style={globalStore.formStyle || formStyle}
        onSubmit={handleSubmit}
      >
        <div className='userImg' style={imgDiv}>
          <a
            target='_blank'
            href={globalStore.currentUserData.currentUserProfile}
          >
            <img
              src={
                globalStore.customImg ||
                customImg ||
                globalStore.currentUserData.currentUserImg
              }
              style={globalStore.imgStyle || imgStyle}
              alt='userIcon'
              className='imgdefault'
            />
          </a>
        </div>
        {globalStore.removeEmoji ? (
          <input
            className='postComment'
            style={
              mode === 'replyMode' || mode === 'editMode'
                ? globalStore.replyInputStyle
                : globalStore.inputStyle || inputStyle
            }
            type='text'
            placeholder='Type your reply here.'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <EmojiInput text={text} setText={setText} />
        )}

        {mode && (
          <button
            className='cancelBtn'
            style={globalStore.cancelBtnStyle || cancelBtnStyle}
            type='button'
            onClick={() =>
              mode === 'editMode'
                ? globalStore.handleAction(comId, true)
                : globalStore.handleAction(comId, false)
            }
          >
            Cancel
          </button>
        )}
        <button
          className='postBtn'
          type='submit'
          disabled={text != '' ? false : true}
          style={globalStore.submitBtnStyle || submitBtnStyle}
          onClick={(e) => (text ? handleSubmit(e) : null)}
        >
          Post
        </button>
      </form>
    </div>
  )
}
export default InputField
