import React, { useState } from 'react'
import styles from './Style.scss'
import InputField from './components/InputField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'


export const CommentSection = ({ authorImg, commentsArray, currentUser }) => {
  const [comments, setComments] = useState(commentsArray)
  console.log(commentsArray, currentUser)
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
            <InputField />
          </div>
        </div>
        <div className={styles.inputActions}>
          <div className={styles.postBtn}>Post</div>
          <div className={styles.cancelBtn}>Cancel</div>
        </div>
      </div>
      <div className={styles.displayComments}>
        {comments.map((i, index) => (
          <div className={styles.userInfo} key={i.userId}>
            <div>{i.text}</div>
            <div className={styles.commentsTwo}>
              <div>
                <img
                  src={i.avatarUrl}
                  style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                  alt='userIcon'
                />
              </div>
              <div className={styles.fullName}>{i.fullName} </div>
              <div>
                <button className={styles.replyBtn}>
                  {' '}
                  <FontAwesomeIcon icon={faReply} size='1x' color='gray' />{' '}
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
