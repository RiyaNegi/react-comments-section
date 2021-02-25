import React, { useEffect, useState } from 'react'
import styles from './Style.scss'
import InputField from './components/InputField'
import DisplayComments from './components/DisplayComments'
import { ActionProvider } from './components/ActionContext'

export const CommentSection = ({ commentsArray, currentUser, setComment }) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])

  return (
    <ActionProvider
      currentUser={currentUser}
      setComment={setComment}
      comments={comments}
    >
      <div className={styles.section}>
        <div className={styles.inputBox}>
          <InputField authorImg={currentUser.avatarUrl} main />
        </div>
        <div className={styles.displayComments}>
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}
