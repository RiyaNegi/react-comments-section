/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react'
import styles from '../Style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import InputField from "./InputField"
import { ActionContext } from "./ActionContext"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { modal, modalClose, modalHeader, modalContent, modalActions, modalActionBtn, modalDelBtn } from "./ModalStyles"

const CommentStructure = ({ i, reply, handleReply, handleEdit, parentId }) => {
	const actions = useContext(ActionContext)

	return (
		<div className={styles.halfDiv}>
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
						<button className={styles.replyBtn} onClick={() => handleReply(i.comId)}>
							{' '}
							<FontAwesomeIcon icon={faReply} size='1x' color='#a5a5a5' /> Reply
                     </button>
					</div>
				</div>
			</div>
			<div className={styles.userActions} >
				{actions.userId === i.userId &&
					<Popup
						role="tooltip"
						trigger={<button className={styles.actionsBtn}>
							<FontAwesomeIcon icon={faEllipsisV} size='1x' color='#b9b9b9' />
						</button>}
						position="right center"
						nested
					>
						<div className={styles.actionDiv} >
							<div><button className={styles.editBtn} onClick={() => handleEdit(i.comId)}> edit</button></div>
							<div><Popup
								trigger={<button className={styles.deleteBtn}> delete</button>
								}
								modal
								nested
							>
								{close => (
									<div className="modal" style={modal}
									>
										<button className="close" onClick={close} style={modalClose}>
											&times;
        </button>
										<div className="header" style={modalHeader}> Delete Comment </div>
										<div className="content" style={modalContent}>
											{' '}
											Delete your comment permanently?
        </div>
										<div className="actions" style={modalActions}>
											<button
												className="button"
												style={modalActionBtn}
												onClick={() => {
													actions.onDelete(i.comId, parentId)
													close();
												}}
											>
												Delete
          </button>
											<button
												className="button"
												style={modalDelBtn}
												onClick={() => {
													close();
												}}
											>
												Cancel
          </button>
										</div>
									</div>
								)}
							</Popup></div>
						</div>
					</Popup>
				}
			</div>
		</div>
	)
}

const DisplayComments = ({ comments }) => {
	const [edit, setEdit] = useState([])

	const handleAction = (id) => {
		setEdit([...edit, id])
	}
	const handleCancelAction = (id) => {
		const list = [...edit]
		const newList = list.filter(i => i !== id)
		setEdit(newList)
	}
	const actions = useContext(ActionContext)
	return (
		<div >
			{comments.map((i, index) => (
				<div key={i.comId} >
					{edit.filter(id => id === i.comId).length !== 0 ? <InputField cancellor={i.comId} value={i.text} handleCancelEdit={handleCancelAction} edit /> :
						<CommentStructure i={i} handleReply={actions.handleReply} handleEdit={handleAction} />
					}
					{actions.replies.filter(id => id === i.comId).length !== 0
						&&
						<InputField cancellor={i.comId} parentId={i.comId} />
					}
					<div className={styles.replySection}>
						{i.replies && i.replies.map((a, index) => (
							<div key={a.comId} >
								{edit.filter(id => id === a.comId).length !== 0 ?
									<InputField cancellor={a.comId} value={a.text} handleCancelEdit={handleCancelAction} edit parentId={i.comId} />
									: <CommentStructure i={a} reply parentId={i.comId} handleReply={actions.handleReply} handleEdit={handleAction} />}
								{ actions.replies.filter(id => id === a.comId).length !== 0 &&
									<InputField cancellor={a.comId} parentId={i.comId} child />
								}
							</div>)
						)}
					</div>
				</div>
			))}
		</div>
	)
}


export default DisplayComments
