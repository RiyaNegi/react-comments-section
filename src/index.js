import React, { useEffect, useState } from 'react'
import styles from './Style.scss'
import InputField from './components/InputField'
import DisplayComments from './components/DisplayComments'

export const CommentSection = ({
  authorImg,
  commentsArray,
  currentUser,
  onSubmit
}) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])
  console.log(comments)

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.inputInfo}>
          <div className={styles.userImg}>
            <img
              src={authorImg}
              style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
              alt='userIcon'
            />
          </div>
          <div className={styles.inputBox}>
            <InputField onSubmit={onSubmit} />
          </div>
        </div>
        <div className={styles.displayComments}>
          <DisplayComments comments={comments} />
        </div>
      </div>
    </div>
  )
}
