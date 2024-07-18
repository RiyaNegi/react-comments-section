import * as React from 'react'
import CommentSectionComponent from './components/CommentSectionComponent/Index'
import GlobalProvider from './context/Provider'
import './Index.scss'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

interface CommentSectionProps {
  currentUser: {
    currentUserId: string
    currentUserImg: string
    currentUserProfile: string
    currentUserFullName: string
  } | null
  logIn: {
    loginLink: string
    signupLink: string
    messagePlaceholder?: string
  }
  replyTop?: boolean
  customImg?: string
  messagePlaceholder?: string
  replyPlaceholder?: string
  inputStyle?: object
  formStyle?: object
  submitBtnStyle?: object
  cancelBtnStyle?: object
  overlayStyle?: object
  imgStyle?: object
  replyInputStyle?: object
  commentsCount?: number
  hrStyle?: object
  titleStyle?: object
  onSubmitAction?: Function
  onDeleteAction?: Function
  onReplyAction?: Function
  onEditAction?: Function
  customNoComment?: Function
  currentData?: Function
  removeEmoji?: boolean
  advancedInput?: boolean
  commentData: Array<{
    userId: string
    comId: string
    fullName: string
    avatarUrl: string
    text: string
    timestamp?: Date
    userProfile?: string
    replies?:
      | Array<{
          userId: string
          comId: string
          fullName: string
          avatarUrl: string
          text: string
          timestamp?: Date
          userProfile?: string
        }>
      | undefined
  }>
}

export const CommentSection = ({
  currentUser,
  customImg,
  messagePlaceholder,
  replyPlaceholder,
  inputStyle,
  formStyle,
  submitBtnStyle,
  cancelBtnStyle,
  overlayStyle,
  replyInputStyle,
  logIn,
  imgStyle,
  replyTop,
  commentsCount,
  commentData,
  hrStyle,
  titleStyle,
  removeEmoji,
  onSubmitAction,
  onDeleteAction,
  onReplyAction,
  onEditAction,
  customNoComment,
  currentData,
  advancedInput
}: CommentSectionProps) => {
  return (
    <GlobalProvider
      currentUser={currentUser}
      replyTop={replyTop}
      messagePlaceholder={messagePlaceholder}
      replyPlaceholder={replyPlaceholder}
      customImg={customImg}
      inputStyle={inputStyle}
      formStyle={formStyle}
      submitBtnStyle={submitBtnStyle}
      cancelBtnStyle={cancelBtnStyle}
      replyInputStyle={replyInputStyle}
      imgStyle={imgStyle}
      commentsCount={commentsCount}
      commentData={commentData}
      onSubmitAction={onSubmitAction}
      onDeleteAction={onDeleteAction}
      onReplyAction={onReplyAction}
      onEditAction={onEditAction}
      currentData={currentData}
      removeEmoji={removeEmoji}
      advancedInput={advancedInput}
    >
      <CommentSectionComponent
        overlayStyle={overlayStyle}
        hrStyle={hrStyle}
        logIn={logIn}
        titleStyle={titleStyle}
        customNoComment={customNoComment}
      />
    </GlobalProvider>
  )
}
