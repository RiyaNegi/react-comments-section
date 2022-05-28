import React, { useRef, useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import './InputField.scss'

function useOutsideAlerter(ref: any, setOpen: Function) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(!open)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

interface EmojiInputProps {
  text: string
  setText: Function
}

const EmojiInput = ({ text, setText }: EmojiInputProps) => {
  const [open, setOpen] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState<{ emoji?: any }>()
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setOpen)

  useEffect(() => {
    if (chosenEmoji) {
      let newText = text + ' ' + chosenEmoji.emoji
      setText(newText)
      console.log('new', newText)
    }
  }, [chosenEmoji])

  const onEmojiClick = (event: any, emojiObject: { emoji?: any }) => {
    console.log('check', event, emojiObject)
    setChosenEmoji(emojiObject)
  }

  return (
    <div className='emoji-input'>
      <input
        className='postComment'
        placeholder='type your reply'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='emoji-icon' onClick={() => setOpen(!open)}></div>
      {open ? (
        <div ref={wrapperRef}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      ) : null}
    </div>
  )
}

export default EmojiInput
