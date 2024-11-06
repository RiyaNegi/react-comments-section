import './CommentStructure.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import { Menu, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css'
import DeleteModal from './DeleteModal'
import React from 'react'
import InputField from "../InputField/Index";

interface CommentStructureProps {
  info: {
    userId: string
    comId: string
    fullName: string
    avatarUrl: string
    text: string
    userProfile?: string
    timestamp?: string
    replies?: Array<object> | undefined
  }
  editMode: boolean
  parentId?: string
  replyMode: boolean
  showTimestamp?: boolean
  mentions?: any[]
  tags?: string[]
  logIn: {
    loginLink?: string | (() => void)
    signUpLink?: string | (() => void)
    onLogin?: string | (() => void)
    onSignUp?: string | (() => void)
  }
}

const CommentStructure = ({
  info,
  editMode,
  parentId,
  replyMode,
  showTimestamp,
  mentions,
  tags
}: CommentStructureProps) => {
  const globalStore: any = useContext(GlobalContext)
  const currentUser = globalStore.currentUserData

  const optionsMenu = () => {
    return (
      <div className='userActions'>
        {info.userId === currentUser.currentUserId && (
          <Menu
            menuButton={
              <button className='actionsBtn'>
                {' '}
                <div className='optionIcon' />
              </button>
            }
          >
            <MenuItem
              onClick={() => globalStore.handleAction(info.comId, true)}
            >
              edit
            </MenuItem>
            <MenuItem
              onClick={globalStore.bypassDeleteWarning ? async () => (
                await globalStore.onDelete(info.comId, parentId),
                globalStore.onDeleteAction &&
                  (await globalStore.onDeleteAction({
                    comIdToDelete: info.comId,
                    parentOfDeleteId: parentId
                  }))
              ) : undefined}

            >
              {globalStore.bypassDeleteWarning ? "delete" : <DeleteModal comId={info.comId} parentId={parentId} /> }
            </MenuItem>
          </Menu>
        )}
      </div>
    )
  }

  const timeAgo = (date: string | number | Date): string => {
    const units = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ]

    const time = Math.floor(
      (new Date().valueOf() - new Date(date).valueOf()) / 1000
    )

    for (let { label, seconds } of units) {
      const interval = Math.floor(time / seconds)
      if (interval >= 1) {
        return `${interval} ${label}${interval > 1 ? 's' : ''} ago`
      }
    }

    return 'just now'
  }

  const userInfo = () => {
    return (
      <div className='commentsTwo'>
        <a className='userLink' target='_blank' href={info.userProfile}>
          <div>
            <img
              src={info.avatarUrl}
              alt='userIcon'
              className='imgdefault'
              style={
                globalStore.imgStyle ||
                (!globalStore.replyTop
                  ? { position: 'relative', top: 7 }
                  : null)
              }
            />
          </div>
          <div className='fullName'>
            {info.fullName}
            <span className='commenttimestamp'>
              {showTimestamp &&
                (info.timestamp == null ? null : timeAgo(info.timestamp))}
            </span>
          </div>
        </a>
      </div>
    )
  }

  const replyTopSection = () => {
    return (
      <div className='halfDiv'>
        <div className='userInfo'>
          <div>{info.text}</div>
          {userInfo()}
        </div>
        {currentUser && optionsMenu()}
      </div>
    )
  }

  const replyBottomSection = () => {
    return (
      <div className='halfDiv'>
        <div className='userInfo'>
          {userInfo()}
          {globalStore.advancedInput ? (
            <div
              className='infoStyle'
              dangerouslySetInnerHTML={{
                __html: info.text
              }}
            />
          ) : info.text.includes("<span data-link-id=") ? (
              <div
                className='infoStyle'
                dangerouslySetInnerHTML={{
                  __html: info.text
                }}
              />
            ) : (
              <div className='infoStyle'>{info.text.replaceAll(/@\[([^\]]+)]\([^)]+\)/g, '$1')}</div>
            )}
          <div style={{ marginLeft: 32 }}>
            {' '}
            {currentUser && (
              <div>
                <button
                  className='replyBtn'
                  onClick={() => globalStore.handleAction(info.comId, false)}
                >
                  <div className='replyIcon' />
                  <span style={{ marginLeft: 17 }}>Reply</span>
                </button>
              </div>
            )}
          </div>
        </div>
        {currentUser && optionsMenu()}
      </div>
    )
  }

  const actionModeSection = (mode: string) => {
    if (mode === 'reply') {
      return (
        <div className='replysection'>
          {globalStore.replyTop ? replyTopSection() : replyBottomSection()}
          <InputField
            formStyle={{
              backgroundColor: 'transparent',
              padding: '20px 0px',
              marginLeft: '-15px'
            }}
            comId={info.comId}
            fillerText={''}
            mode={'replyMode'}
            parentId={parentId}
            mentions={mentions}
            tags={tags}
          />
        </div>
      )
    } else {
      return (
        <InputField
          formStyle={{
            backgroundColor: 'transparent',
            padding: '20px 0px',
            marginLeft: '-15px'
          }}
          comId={info.comId}
          fillerText={info.text}
          mode={'editMode'}
          parentId={parentId}
          mentions={mentions}
          tags={tags}
        />
      )
    }
  }

  return (
    <div>
      {editMode
        ? actionModeSection('edit')
        : replyMode
        ? actionModeSection('reply')
        : globalStore.replyTop
        ? replyTopSection()
        : replyBottomSection()}
    </div>
  )
}

export default CommentStructure
