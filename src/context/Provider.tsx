import React, { createContext, useEffect, useState } from 'react'
// const { v4: uuidv4 } = require('uuid')  // Si vous souhaitez générer des UUID, décommentez cette ligne
import _ from 'lodash'  // Utilisation de Lodash pour les manipulations de tableaux

// Création du contexte global pour partager l'état avec les composants enfants
export const GlobalContext = createContext({})

// Le fournisseur de contexte qui gère l'état et les actions liées aux commentaires
export const GlobalProvider = ({
  children,
  currentUser,
  replyTop,
  customImg,
  inputStyle,
  formStyle,
  submitBtnStyle,
  cancelBtnStyle,
  imgStyle,
  commentsCount,
  commentData,
  onSubmitAction,
  onDeleteAction,
  onReplyAction,
  onEditAction,
  currentData,
  replyInputStyle,
  removeEmoji,
  advancedInput,
  placeHolder
}: {
  // Définition des props que le fournisseur recevra, comme les données sur l'utilisateur, les styles, etc.
  children: any
  currentUser?: {
    currentUserId: string
    currentUserImg: string
    currentUserProfile?: string | undefined
    currentUserFullName: string
  } | null
  replyTop?: boolean
  customImg?: string
  inputStyle?: object
  formStyle?: object
  submitBtnStyle?: object
  cancelBtnStyle?: object
  imgStyle?: object
  replyInputStyle?: object
  commentsCount?: number
  removeEmoji?: boolean
  commentData?: Array<{
    userId: string
    comId: string
    fullName: string
    avatarUrl: string
    text: string
    timestamp?: string
    userProfile?: string
    replies?:
      | Array<{
          userId: string
          comId: string
          fullName: string
          avatarUrl: string
          text: string
          timestamp?: string
          userProfile?: string
        }>
      | undefined
  }>
  onSubmitAction?: Function
  onDeleteAction?: Function
  onReplyAction?: Function
  onEditAction?: Function
  currentData?: Function
  advancedInput?: boolean
  placeHolder?: string
}) => {
  // État local pour les données de l'utilisateur courant et les commentaires
  const [currentUserData] = useState(currentUser)
  const [data, setData] = useState<
    Array<{
      userId: string
      comId: string
      fullName: string
      avatarUrl: string
      text: string
      userProfile?: string
      timestamp?: string
      replies?:
        | Array<{
            userId: string
            comId: string
            fullName: string
            avatarUrl: string
            text: string
            timestamp?: string
            userProfile?: string
          }>
        | undefined
    }>
  >([])  // Données des commentaires et réponses
  const [editArr, setEdit] = useState<string[]>([])  // État pour les commentaires en cours d'édition
  const [replyArr, setReply] = useState<string[]>([])  // État pour les commentaires en cours de réponse

  // Effet pour charger les données des commentaires depuis les props si elles sont définies
  useEffect(() => {
    if (commentData) {
      setData(commentData)
    }
  }, [commentData])

  // Effet pour envoyer les données actuelles à la fonction `currentData` à chaque mise à jour des données
  useEffect(() => {
    if (currentData) {
      currentData(data)
    }
  }, [data])

  // Fonction pour gérer les actions de réponse et d'édition (ajouter ou retirer de l'array `editArr` ou `replyArr`)
  const handleAction = (id: string, edit: boolean) => {
    if (edit) {
      let editArrCopy: string[] = [...editArr]
      let indexOfId = _.indexOf(editArrCopy, id)
      if (_.includes(editArr, id)) {
        editArrCopy.splice(indexOfId, 1)
        setEdit(editArrCopy)
      } else {
        editArrCopy.push(id)
        setEdit(editArrCopy)
      }
    } else {
      let replyArrCopy: string[] = [...replyArr]
      let indexOfId = _.indexOf(replyArrCopy, id)
      if (_.includes(replyArr, id)) {
        replyArrCopy.splice(indexOfId, 1)
        setReply(replyArrCopy)
      } else {
        replyArrCopy.push(id)
        setReply(replyArrCopy)
      }
    }
  }

  // Fonction pour soumettre un nouveau commentaire
  const onSubmit = (text: string, uuid: string) => {
    let copyData = [...data]
    copyData.push({
      userId: currentUserData!.currentUserId,
      comId: uuid,
      avatarUrl: currentUserData!.currentUserImg,
      userProfile: currentUserData!.currentUserProfile
        ? currentUserData!.currentUserProfile
        : undefined,
      fullName: currentUserData!.currentUserFullName,
      text: text,
      timestamp: `${new Date().toISOString()}`,
      replies: []
    })
    setData(copyData)
  }

  // Fonction pour éditer un commentaire
  const onEdit = (text: string, comId: string, parentId: string) => {
    let copyData = [...data]
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId })
      const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
        comId: comId
      })
      copyData[indexOfParent].replies![indexOfId].text = text
      setData(copyData)
      handleAction(comId, true)
    } else {
      const indexOfId = _.findIndex(copyData, { comId: comId })
      copyData[indexOfId].text = text
      setData(copyData)
      handleAction(comId, true)
    }
  }

  // Fonction pour répondre à un commentaire
  const onReply = (
    text: string,
    comId: string,
    parentId: string,
    uuid: string
  ) => {
    let copyData = [...data]
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId })
      copyData[indexOfParent].replies!.push({
        userId: currentUserData!.currentUserId,
        comId: uuid,
        avatarUrl: currentUserData!.currentUserImg,
        userProfile: currentUserData!.currentUserProfile
          ? currentUserData!.currentUserProfile
          : undefined,
        fullName: currentUserData!.currentUserFullName,
        text: text,
        timestamp: `${new Date().toISOString()}`
      })
      setData(copyData)
      handleAction(comId, false)
    } else {
      const indexOfId = _.findIndex(copyData, {
        comId: comId
      })
      copyData[indexOfId].replies!.push({
        userId: currentUserData!.currentUserId,
        comId: uuid,
        avatarUrl: currentUserData!.currentUserImg,
        userProfile: currentUserData!.currentUserProfile
          ? currentUserData!.currentUserProfile
          : undefined,
        fullName: currentUserData!.currentUserFullName,
        text: text,
        timestamp: `${new Date().toISOString()}`
      })
      setData(copyData)
      handleAction(comId, false)
    }
  }

  // Fonction pour supprimer un commentaire ou une réponse
  const onDelete = (comId: string, parentId: string) => {
    let copyData = [...data]
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId })
      const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
        comId: comId
      })
      copyData[indexOfParent].replies!.splice(indexOfId, 1)
      setData(copyData)
    } else {
      const indexOfId = _.findIndex(copyData, { comId: comId })
      copyData.splice(indexOfId, 1)
      setData(copyData)
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        // Valeurs partagées par le contexte pour les enfants
        currentUserData: currentUserData,
        replyTop: replyTop,
        data: data,
        handleAction: handleAction,
        editArr: editArr,
        onSubmit: onSubmit,
        onEdit: onEdit,
        replyArr: replyArr,
        onReply: onReply,
        onDelete: onDelete,
        customImg: customImg,
        inputStyle: inputStyle,
        formStyle: formStyle,
        submitBtnStyle: submitBtnStyle,
        cancelBtnStyle: cancelBtnStyle,
        imgStyle: imgStyle,
        commentsCount: commentsCount,
        onSubmitAction: onSubmitAction,
        onDeleteAction: onDeleteAction,
        onReplyAction: onReplyAction,
        onEditAction: onEditAction,
        replyInputStyle: replyInputStyle,
        removeEmoji: removeEmoji,
        advancedInput: advancedInput,
        placeHolder: placeHolder
      }}
    >
      {children}  {/* Les composants enfants qui consomment ce contexte */}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider  // Exportation du fournisseur pour utilisation dans l'application
