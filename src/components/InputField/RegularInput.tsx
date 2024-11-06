import React, {useEffect, useState} from 'react'
import './InputField.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import EmojiInput from './EmojiInput'
import {MentionsInput, Mention, SuggestionDataItem} from 'react-mentions'

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
  placeHolder?: string,
  mentions?: SuggestionDataItem[],
  tags?: string[],
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
  setText,
  placeHolder,
  mentions,
  tags
}: RegularInputProps) => {
  const globalStore: any = useContext(GlobalContext)
  // const neverMatchingRegex = /($a)($b)/
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json'
    )
      .then((response) => {
        return response.json()
      })
      .then(json => json.emojis)
      .then(d => d.filter((e: any) => e.order && !e.unicode.includes(" ")))
      .then(d => d.sort((a: any, b: any) => parseInt(a.order) - parseInt(b.order)))
      .then(setEmojis)
  }, []);

  const queryEmojis = (query: any) => {
    if (query.length === 0) return;

    const matches = emojis
      .filter((emoji: any) => emoji.shortname.indexOf(query.toLowerCase()) === 1 || emoji.name.indexOf(query.toLowerCase()) > -1)
      .sort((a: any, b: any) => a.unicode.length - b.unicode.length)
      .slice(0, 16);
    return matches.map((e: any) => ({ id: e.emoji, display: e.emoji }));
  };

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
      {true || mentions || tags ? (
          <MentionsInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='postComment'
            style={
              mode === 'replyMode' || mode === 'editMode'
                ? globalStore.replyInputStyle
                : globalStore.inputStyle || inputStyle
            }
            placeholder={placeHolder ? placeHolder : 'Type your reply here.'}
          >
            <Mention trigger="@" className="mention" data={mentions || []} />
            <Mention trigger="#" className="mention" data={tags?.map(tag => {
              return {id: tag, display: `#${tag}`};
            }) || []}/>
            <Mention trigger=":" data={queryEmojis} />
          </MentionsInput>

        ) : globalStore.removeEmoji ? (
        <input
          className='postComment'
          style={
            mode === 'replyMode' || mode === 'editMode'
              ? globalStore.replyInputStyle
              : globalStore.inputStyle || inputStyle
          }
          type='text'
          placeholder={placeHolder ? placeHolder : 'Type your reply here.'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <EmojiInput
          text={text}
          setText={setText}
          mode={mode}
          inputStyle={inputStyle}
          placeHolder={placeHolder}
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
