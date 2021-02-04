import React from 'react'
import styles from './Style.scss'
import InputField from './components/InputField'

export const CommentSection = () => {
  return (
    <div className={styles.section}>
      <div className={styles.inputInfo}>
        <div className={styles.userImg}>User Image</div>
        <div className={styles.inputBox}>
          <InputField />
        </div>
      </div>
      <div className={styles.inputActions}>
        <div className={styles.postBtn}>Post</div>
        <div className={styles.cancelBtn}>Cancel</div>
      </div>
    </div>
  )
}
