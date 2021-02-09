/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styles from '../Style.scss'

const InputField = ({ onSubmit, handleLibSubmit }) => {
    const [text, setText] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <form>
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
                <div className={styles.cancelBtn}>Cancel</div>
            </div>
        </form>

    )
}

export default InputField
