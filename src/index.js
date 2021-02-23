import React, { useEffect, useState } from 'react'
import styles from './Style.scss'
import InputField from './components/InputField'
import DisplayComments from './components/DisplayComments'
import { ActionProvider } from './components/ActionContext'

export const CommentSection = ({
  commentsArray,
  currentUser,
  onSubmit,
  editText,
  deleteText
}) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])

  return (
    <ActionProvider
      onSubmit={onSubmit}
      currentUser={currentUser}
      onEdit={editText}
      onDelete={deleteText}
    >
      <div className={styles.section}>
        <div className={styles.inputBox}>
          <InputField onSubmit={onSubmit} authorImg={currentUser.avatarUrl} />
        </div>
        <div className={styles.displayComments}>
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}
