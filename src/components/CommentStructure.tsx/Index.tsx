import './CommentStructure.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import InputField from '../InputField/Index'
import { Menu, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css'
import DeleteModal from './DeleteModal'
import React from 'react'

interface CommentStructureProps {
  info: {
    userId: string
    comId: string
    fullName: string
    avatarUrl: string
    text: string
    userProfile?: string
    datePosted:string
    replies?: Array<object> | undefined
  }
  editMode: boolean
  parentId?: string
  replyMode: boolean
  logIn: {
    loginLink: string
    signupLink: string
  }
}

const CommentStructure = ({
  info,
  editMode,
  parentId,
  replyMode
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
            <MenuItem>
              <DeleteModal comId={info.comId} parentId={parentId} />
            </MenuItem>
          </Menu>
        )}
      </div>
    )
  }

  /* This function format the date string into a user friendly
  text */
  function timeSince(date:string):string {
    let actualDate:Date = new Date(date);
    let dateNow:Date = new Date()
    const seconds:number = Math.floor((dateNow.getTime() - actualDate.getTime()) / 1000);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
  
    const minutes:number = Math.floor(seconds / 60);
  
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
  
    const hours:number = Math.floor(minutes / 60);
  
    if (hours < 24) {
      return `${hours} hours ago`;
    }
  
    const days:number = Math.floor(hours / 24);
  
    if (days < 30) {
      return `${days} days ago`;
    }
  
    const months:number = Math.floor(days / 30);
  
    if (months < 12) {
      return `${months} months ago`;
    }
  
    const years:number = Math.floor(months / 12);
  
    return `${years} years ago`;
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
          <div className='fullName'>{info.fullName}<span className='commentDate'>         
          {timeSince(info.datePosted)}</span></div>         
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
          ) : (
            <div className='infoStyle'>{info.text}</div>
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
