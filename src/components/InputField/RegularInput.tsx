import React from 'react'
import './InputField.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import EmojiInput from './EmojiInput'

interface RegularInputProps {
  formStyle?: object
  comId?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
  handleSubmit: Function
  text: string
  setText: Function
}

const RegularInput = ({
  formStyle,
  imgDiv,
  imgStyle,
  customImg,
  mode,
  inputStyle,
  cancelBtnStyle,
  comId,
  submitBtnStyle,
  handleSubmit,
  text,
  setText
}: RegularInputProps) => {
  const globalStore: any = useContext(GlobalContext)

  return (
    <form
      className='form'
      style={globalStore.formStyle || formStyle}
      onSubmit={() => handleSubmit}
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
        <EmojiInput
          text={text}
          setText={setText}
          mode={mode}
          inputStyle={inputStyle}
        />
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
  )
}

export default RegularInput
