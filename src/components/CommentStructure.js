import React, { useContext } from 'react'
import styles from '../Style.scss'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import {
  modal,
  modalClose,
  modalHeader,
  modalContent,
  modalActions,
  modalActionBtn,
  modalDelBtn
} from './ModalStyles'
import { ActionContext } from './ActionContext'

const CommentStructure = ({ i, reply, parentId }) => {
  const actions = useContext(ActionContext)
  const edit = true

  return (
    <div className={styles.halfDiv}>
      <div
        className={styles.userInfo}
        style={reply && { marginLeft: 15, marginTop: '6px' }}
      >
        <div>{i.text}</div>
        <div className={styles.commentsTwo}>
          <div>
            <img
              src={i.avatarUrl}
              style={{ width: 24, height: 24, borderRadius: 24 / 2 }}
              alt='userIcon'
            />
          </div>
          <div className={styles.fullName}>{i.fullName} </div>
          <div>
            <button
              className={styles.replyBtn}
              onClick={() => actions.handleAction(i.comId)}
              disabled={!actions.user}
            >
              {' '}
              <FontAwesomeIcon icon={faReply} size='1x' color='#a5a5a5' /> {actions.i18n.comment.reply}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.userActions}>
        {actions.userId === i.userId && actions.user && (
          <Popup
            role='tooltip'
            trigger={
              <button className={styles.actionsBtn}>
                <FontAwesomeIcon icon={faEllipsisV} size='1x' color='#b9b9b9' />
              </button>
            }
            position='right center'
            nested
          >
            <div className={styles.actionDiv}>
              <div>
                <button
                  className={styles.editBtn}
                  onClick={() => actions.handleAction(i.comId, edit)}
                >
                  {' '}
                  {actions.i18n.editComment.action}
                </button>
              </div>
              <div>
                <Popup
                  trigger={
                    <button className={styles.deleteBtn}> {actions.i18n.deleteComment.action}</button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div className='modal' style={modal}>
                      <button
                        className='close'
                        onClick={close}
                        style={modalClose}
                      >
                        &times;
                      </button>
                      <div className='header' style={modalHeader}>
                        {' '}
                        {actions.i18n.deleteComment.header}{' '}
                      </div>
                      <div className='content' style={modalContent}>
                        {' '}
                        {actions.i18n.deleteComment.content}
                      </div>
                      <div className='actions' style={modalActions}>
                        <button
                          className='button'
                          style={modalActionBtn}
                          onClick={() => {
                            actions.onDelete(i.comId, parentId)
                            close()
                          }}
                        >
                          {actions.i18n.deleteComment.confirmButton}
                        </button>
                        <button
                          className='button'
                          style={modalDelBtn}
                          onClick={() => {
                            close()
                          }}
                        >
                          {actions.i18n.deleteComment.cancelButton}
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  )
}

export default CommentStructure
