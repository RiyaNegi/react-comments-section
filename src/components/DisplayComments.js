/* eslint-disable prettier/prettier */

import React from 'react'
import styles from '../Style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'

const DisplayComments = ({ comments }) => {
    return (
        <div >
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
                                <FontAwesomeIcon icon={faReply} size='1x' color='gray' /> Reply
              </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DisplayComments
