import './InputField.scss'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/Provider'
import React from 'react'

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

  return (
    <form className='form' style={formStyle || globalStore.formStyle}>
      <div className='userImg' style={imgDiv}>
        <a
          target='_blank'
          href={globalStore.currentUserData.currentUserProfile}
        >
          <img
            src={
              customImg ||
              globalStore.customImg ||
              globalStore.currentUserData.currentUserImg
            }
            style={imgStyle || globalStore.imgStyle}
            alt='userIcon'
            className='imgdefault'
          />
        </a>
      </div>
      <input
        className='postComment'
        style={inputStyle || globalStore.inputStyle}
        type='text'
        placeholder='Type your reply here.'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {mode && (
        <button
          className='cancelBtn'
          style={cancelBtnStyle || globalStore.cancelBtnStyle}
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
        type='button'
        style={submitBtnStyle || globalStore.submitBtnStyle}
        onClick={async () => {
          mode === 'editMode'
            ? (await globalStore.onEdit(text, comId, parentId),
              globalStore.onEditAction && (await globalStore.onEditAction()))
            : mode === 'replyMode'
            ? (await globalStore.onReply(text, comId, parentId),
              globalStore.onReplyAction && (await globalStore.onReplyAction()))
            : (await globalStore.onSubmit(text),
              globalStore.onSubmitAction &&
                (await globalStore.onSubmitAction()))
          setText('')
        }}
      >
        Post
      </button>
    </form>
  )
}
export default InputField
