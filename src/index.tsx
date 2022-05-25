import * as React from 'react'
import CommentSection from './components/CommentSection/Index'
import GlobalProvider from './context/Provider'

interface CommentSectionProps {
  currentUser: {
    currentUserId: string
    currentUserImg: string
    currentUserProfile: string
    currentUserFullName: string
  } | null
  logIn?: {
    loginLink: string
    signupLink: string
  }
  replyTop?: boolean
  customImg?: string
  inputStyle?: object
  formStyle?: object
  submitBtnStyle?: object
  cancelBtnStyle?: object
  overlayStyle?: object
  imgStyle?: object
  commentsCount?: number
  hrStyle?: object
  titleStyle?: object
  onSubmitAction?: Function
  onDeleteAction?: Function
  onReplyAction?: Function
  onEditAction?: Function
  customNoComment?: Function
  commentData: Array<{
    userId: string
    comId: string
    fullName: string
    avatarUrl: string
    text: string
    userProfile?: string
    replies?: Array<object> | undefined
  }>
}

export const CommentSectionComponent = ({
  currentUser,
  customImg,
  inputStyle,
  formStyle,
  submitBtnStyle,
  cancelBtnStyle,
  overlayStyle,
  logIn,
  imgStyle,
  replyTop,
  commentsCount,
  commentData,
  hrStyle,
  titleStyle,
  onSubmitAction,
  onDeleteAction,
  onReplyAction,
  onEditAction,
  customNoComment
}: CommentSectionProps) => {
  return (
    <GlobalProvider
      currentUser={currentUser}
      replyTop={replyTop}
      customImg={customImg}
      inputStyle={inputStyle}
      formStyle={formStyle}
      submitBtnStyle={submitBtnStyle}
      cancelBtnStyle={cancelBtnStyle}
      imgStyle={imgStyle}
      commentsCount={commentsCount}
      commentData={commentData}
      onSubmitAction={onSubmitAction}
      onDeleteAction={onDeleteAction}
      onReplyAction={onReplyAction}
      onEditAction={onEditAction}
    >
      <CommentSection
        overlayStyle={overlayStyle}
        hrStyle={hrStyle}
        logIn={logIn}
        titleStyle={titleStyle}
        customNoComment={customNoComment}
      />
    </GlobalProvider>
  )
}
