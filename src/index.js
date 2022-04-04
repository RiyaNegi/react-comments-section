import React, { useEffect, useState } from 'react'
import styles from './Style.scss'
import DisplayComments from './components/DisplayComments'
import { ActionProvider } from './components/ActionContext'
import SignField from './components/SignField'
import Input from './components/Input'

export const enI18n = {
  sign: {
    boxLine: 'Log in or sign up to leave a comment',
    logIn: 'Log In',
    signUp: 'Sign Up'
  },
  post: {
    placeholder: 'Type your reply here.',
    post: 'Post',
    cancel: 'Cancel',
  },
  comment: {
    reply: 'Reply'
  },
  editComment: {
    action: 'edit'
  },
  deleteComment: {
    action: 'delete',
    header: 'Delete Comment',
    content: 'Delete your comment permanently?',
    confirmButton: 'Delete',
    cancelButton: 'Cancel'
  }
}

export const CommentSection = ({
  commentsArray,
  currentUser,
  setComment,
  signinUrl,
  signupUrl,
  customInput,
  i18n = enI18n
}) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])

  return (
    <ActionProvider
      currentUser={currentUser}
      setComment={setComment}
      comments={comments}
      signinUrl={signinUrl}
      signupUrl={signupUrl}
      customInput={customInput}
      i18n={i18n}
    >
      <div className={styles.section}>
        <div className={styles.inputBox}>
          {signupUrl && !currentUser ? <SignField /> : <Input />}
        </div>
        <div className={styles.displayComments}>
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}
