/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styles from '../Style.scss'

const InputField = () => {
    const [text, setText] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <input
            className={styles.postComment}
            type='text'
            placeholder='Type your reply here.'
            component='input'
            value={text}
            onChange={handleChange}
        />
    )
}

export default InputField
