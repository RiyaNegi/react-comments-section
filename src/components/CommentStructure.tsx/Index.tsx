import './CommentStructure.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import InputField from '../InputField/Index'
import { Menu, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css'
import DeleteModal from './DeleteModal'
import React from 'react'

// Définition des types des props du composant
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
}

const CommentStructure = ({
  info,
  editMode,
  parentId,
  replyMode,
  showTimestamp
}: CommentStructureProps) => {
  // Utilisation du contexte global pour accéder aux données de l'utilisateur actuel
  const globalStore: any = useContext(GlobalContext)
  const currentUser = globalStore.currentUserData

  // Fonction pour afficher le menu d'options (éditer, supprimer)
  const optionsMenu = () => {
    return (
      <div className='userActions'>
        {/* Si c'est le commentaire de l'utilisateur actuel, il voit les options d'édition et de suppression */}
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
              {/* Modal de suppression pour supprimer ce commentaire */}
              <DeleteModal comId={info.comId} parentId={parentId} />
            </MenuItem>
          </Menu>
        )}
      </div>
    )
  }

  // Fonction pour calculer l'intervalle de temps (comme "il y a 2 heures")
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

    // Parcourt les unités de temps pour déterminer combien de temps s'est écoulé
    for (let { label, seconds } of units) {
      const interval = Math.floor(time / seconds)
      if (interval >= 1) {
        return `${interval} ${label}${interval > 1 ? 's' : ''} ago`
      }
    }

    return 'just now'
  }

  // Fonction pour afficher les informations de l'utilisateur (nom, avatar, profil)
  const userInfo = () => {
    return (
      <div className='commentsTwo'>
        <a className='userLink' target='_blank' href={info.userProfile}>
          <div>
            <img
              src={info.avatarUrl}
              alt='userIcon'
              className='imgdefault'
              style={globalStore.imgStyle || (!globalStore.replyTop ? { position: 'relative', top: 7 } : null)}
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

  // Section pour afficher une réponse au commentaire en haut (ou le bas) d'une conversation
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

  // Section pour afficher la réponse en bas d'une conversation
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
            {/* Si l'utilisateur est connecté, il voit l'option pour répondre */}
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

  // Affichage des sections selon le mode (réponse ou édition)
  const actionModeSection = (mode: string) => {
    if (mode === 'reply') {
      return (
        <div className='replysection'>
          {globalStore.replyTop ? replyTopSection() : replyBottomSection()}
          {/* Champ pour répondre au commentaire */}
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
        // Champ pour éditer un commentaire
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
      {/* Si en mode édition, afficher le champ d'édition */}
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
