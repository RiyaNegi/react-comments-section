import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

interface AdvancedInputProps {
  formStyle?: object
  handleSubmit: Function
  mode?: string
  cancelBtnStyle?: object
  submitBtnStyle?: object
  comId?: string
  imgStyle?: object
  imgDiv?: object
  customImg?: string
  text: string
  placeHolder?: string
}

const AdvancedInput = ({
  formStyle,
  handleSubmit,
  submitBtnStyle,
  cancelBtnStyle,
  mode,
  comId,
  imgDiv,
  imgStyle,
  customImg,
  text,
  placeHolder
}: AdvancedInputProps) => {
  const [html, setHtml] = useState('<p></p>')
  const globalStore: any = useContext(GlobalContext)
  useEffect(() => {
    if (text != '') {
      setHtml(text)
    }
  }, [text])
  useEffect(() => {
    if (html != '<p></p>') {
      setEditor(EditorState.createWithContent(contentState))
    }
  }, [html])

  const contentBlock = htmlToDraft(html)
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  )
  const [editorState, setEditor] = useState(
    EditorState.createWithContent(contentState)
  )
  const [editText, setEditText] = useState<string>('')

  const onEditorStateChange: Function = (editorState: any) => {
    setEditor(editorState)
  }
  useEffect(() => {
    setEditText(
      draftToHtml(convertToRaw(editorState.getCurrentContent())).trim()
    )
  }, [editorState])

  return (
    <div className='advanced-overlay'>
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
      <div className='advanced-input'>
        <form
          className='form advanced-form '
          style={globalStore.formStyle || formStyle}
          onSubmit={async (e) =>
            editText != '<p></p>'
              ? (await handleSubmit(e, editText),
                setEditor(EditorState.createEmpty()))
              : null
          }
        >
          <div className='advanced-border'>
            <Editor
              editorState={editorState}
              placeholder={placeHolder ? placeHolder : 'Type your reply here.'}
              onEditorStateChange={(editorState) =>
                onEditorStateChange(editorState)
              }
              toolbar={{
                options: [
                  'inline',
                  'blockType',
                  'list',
                  'colorPicker',
                  'link',
                  'emoji',
                  'image'
                ],
                link: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  popupClassName: undefined,
                  dropdownClassName: undefined,
                  showOpenOptionOnHover: true,
                  defaultTargetOption: '_self',
                  options: ['link'],
                  linkCallback: undefined
                },
                image: {
                  className: undefined,
                  component: undefined,
                  popupClassName: undefined,
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: undefined,
                  previewImage: false,
                  inputAccept:
                    'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                  alt: { present: false, mandatory: false },
                  defaultSize: {
                    height: 'auto',
                    width: 'auto'
                  }
                },
                inline: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'monospace'
                  ]
                },
                blockType: {
                  inDropdown: true,
                  options: ['Normal', 'Blockquote', 'Code'],
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined
                },
                list: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ['unordered', 'ordered']
                }
              }}
            />
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: text
            }}
          /> */}
          <div className='advanced-btns'>
            {mode && (
              <button
                className='advanced-cancel cancelBtn'
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
              className='advanced-post postBtn'
              type='submit'
              disabled={editText === '<p></p>' ? true : false}
              style={globalStore.submitBtnStyle || submitBtnStyle}
              onClick={async (e) =>
                editText != '<p></p>'
                  ? (await handleSubmit(e, editText),
                    setEditor(EditorState.createEmpty()))
                  : null
              }
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdvancedInput
