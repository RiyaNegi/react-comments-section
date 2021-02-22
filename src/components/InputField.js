/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'

const InputField = ({ cancellor, parentId, child, value, handleCancelEdit, edit }) => {
    const [text, setText] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        setText(value)
    }, [value]);


    const actions = useContext(ActionContext)

    console.log("edit", edit)
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
                <div className={styles.postBtn}
                    onClick={() =>
                        edit === true ? (
                            actions.onEdit(cancellor, text, parentId),
                            handleCancelEdit(cancellor)
                        ) : (
                                actions.onSubmit(text, parentId, child && child),
                                (actions.handleCancel(cancellor))
                            )
                    }>
                    Post</div>
                <div className={styles.cancelBtn} onClick={() => handleCancelEdit ? handleCancelEdit(cancellor) : actions.handleCancel(cancellor)}>Cancel</div>
            </div>
        </form >

    )
}

export default InputField
