import React, { useContext, useState } from 'react'
import styles from '../Style.scss'
import InputField from './InputField'
import { ActionContext } from './ActionContext'
import 'reactjs-popup/dist/index.css'
import CommentStructure from './CommentStructure'

const DisplayComments = ({ comments }) => {
  const [edit, setEdit] = useState([])

  const handleAction = (id) => {
    setEdit([...edit, id])
  }
  const handleCancelAction = (id) => {
    const list = [...edit]
    const newList = list.filter((i) => i !== id)
    setEdit(newList)
  }
  const actions = useContext(ActionContext)
  return (
    <div>
      {comments.map((i, index) => (
        <div key={i.comId}>
          {edit.filter((id) => id === i.comId).length !== 0 ? (
            actions.customInput ? (
              actions.customInput({
                cancellor: i.comId,
                value: i.text,
                handleCancelEdit: handleCancelAction,
                onSubmit: actions.onSubmit,
                edit: true,
                handleCancel: actions.handleCancel,
                onEdit: actions.onEdit
              })
            ) : (
              <InputField
                cancellor={i.comId}
                value={i.text}
                handleCancelEdit={handleCancelAction}
                edit
              />
            )
          ) : (
            <CommentStructure
              i={i}
              handleReply={actions.handleReply}
              handleEdit={handleAction}
            />
          )}
          {actions.replies.filter((id) => id === i.comId).length !== 0 &&
            (actions.customInput ? (
              actions.customInput({
                cancellor: i.comId,
                parentId: i.comId,
                onSubmit: actions.onSubmit,
                handleCancel: actions.handleCancel,
                handleCancelEdit: handleCancelAction
              })
            ) : (
              <InputField cancellor={i.comId} parentId={i.comId} />
            ))}
          <div className={styles.replySection}>
            {i.replies &&
              i.replies.map((a, index) => (
                <div key={a.comId}>
                  {edit.filter((id) => id === a.comId).length !== 0 ? (
                    actions.customInput ? (
                      actions.customInput({
                        cancellor: a.comId,
                        value: a.text,
                        handleCancelEdit: handleCancelAction,
                        edit,
                        parentId: i.comId,
                        onSubmit: actions.onSubmit,
                        handleCancel: actions.handleCancel,
                        onEdit: actions.onEdit
                      })
                    ) : (
                      <InputField
                        cancellor={a.comId}
                        value={a.text}
                        handleCancelEdit={handleCancelAction}
                        edit
                        parentId={i.comId}
                      />
                    )
                  ) : (
                    <CommentStructure
                      i={a}
                      reply
                      parentId={i.comId}
                      handleReply={actions.handleReply}
                      handleEdit={handleAction}
                    />
                  )}
                  {actions.replies.filter((id) => id === a.comId).length !==
                    0 &&
                    (actions.customInput ? (
                      actions.customInput({
                        cancellor: a.comId,
                        parentId: i.comId,
                        child: true,
                        onSubmit: actions.onSubmit,
                        handleCancel: actions.handleCancel,
                        handleCancelEdit: handleCancelAction
                      })
                    ) : (
                      <InputField
                        cancellor={a.comId}
                        parentId={i.comId}
                        child
                      />
                    ))}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayComments
