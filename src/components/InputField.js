/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styles from '../Style.scss'

const InputField = ({ onSubmit, handleLibSubmit, handleCancel, cancellor, authorImg }) => {
    const [text, setText] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    }


    return (
        <form className={styles.form}>
            <div className={styles.userImg}>
                <img
                    src={authorImg}
                    style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                    alt='userIcon'
                />
            </div>
            <input
                className={styles.postComment}
                type='text'
                placeholder='Type your reply here.'
                component='input'
                value={text}
                onChange={handleChange}
            />
            <div className={styles.inputActions}>
                <div className={styles.postBtn} onClick={() => { handleLibSubmit(text); onSubmit(text) }}>Post</div>
                <div className={styles.cancelBtn} onClick={() => handleCancel(cancellor)}>Cancel</div>
            </div>
        </form>

    )
}

export default InputField
