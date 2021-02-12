/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'

const InputField = ({ cancellor, parentId, child }) => {
    const [text, setText] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const actions = useContext(ActionContext)


    return (
        <form className={styles.form}>
            <div className={styles.userImg}>
                <img
                    src={actions.userImg}
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
                <div className={styles.postBtn} onClick={() => { actions.handleCancel(cancellor); actions.onSubmit(text, parentId, child && child) }}>Post</div>
                <div className={styles.cancelBtn} onClick={() => actions.handleCancel(cancellor)}>Cancel</div>
            </div>
        </form>

    )
}

export default InputField
