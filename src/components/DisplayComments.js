/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styles from '../Style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import InputField from "./InputField"
// const handleCancel = useContext(ActionContext)
const CommentStructure = ({ i, reply, handleReply }) => {


    // const actions = useContext(ActionContext)
    return (
        <div className={styles.userInfo} style={reply && { marginLeft: 15 }} >
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
                    <button className={styles.replyBtn} onClick={() => handleReply(i.userId)}>
                        {' '}
                        <FontAwesomeIcon icon={faReply} size='1x' color='gray' /> Reply
                     </button>
                </div>
            </div>
        </div>
    )
}

const DisplayComments = ({ comments }) => {
    const [replies, setReplies] = useState([])
    const handleReply = (id) => {
        setReplies([...replies, id])
    }
    const handleCancel = (id) => {
        const list = [...replies]
        const newList = list.filter(i => i !== id)
        setReplies(newList)
    }

    console.log(replies)
    return (
        <div >
            {comments.map((i, index) => (
                <div key={i.userId} >
                    {replies.filter(id => id === i.userId).length === 0 ? <CommentStructure i={i} handleReply={handleReply} /> : <InputField handleCancel={handleCancel} cancellor={i.userId} />
                    }
                    <div className={styles.replySection}>
                        {i.replies && i.replies.map((i, index) => replies.filter(id => id === i.userId).length === 0 ? <CommentStructure i={i} key={i.userId} reply handleReply={handleReply} /> : <InputField handleCancel={handleCancel} cancellor={i.userId} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}


export default DisplayComments
