import './InputField.scss'  // Importation des styles spécifiques au composant
import { useContext, useEffect, useState } from 'react'  // Importation des hooks nécessaires
import { GlobalContext } from '../../context/Provider'  // Importation du contexte global pour accéder aux données et actions
import React from 'react'
const { v4: uuidv4 } = require('uuid')  // Importation de uuid pour générer des identifiants uniques
import RegularInput from './RegularInput'  // Composant pour un champ de texte simple
import AdvancedInput from './AdvancedInput'  // Composant pour un champ de texte avancé avec des options supplémentaires

// Définition des types des props du composant
interface InputFieldProps {
  formStyle?: object  // Style du formulaire
  comId?: string  // ID du commentaire
  fillerText?: string  // Texte à afficher dans le champ en mode édition ou réponse
  parentId?: string  // ID du parent si c'est une réponse
  mode?: string  // Mode d'affichage ('editMode', 'replyMode', 'submitMode')
  customImg?: string  // Image personnalisée (si applicable)
  inputStyle?: object  // Style pour l'input
  cancelBtnStyle?: object  // Style du bouton d'annulation
  submitBtnStyle?: object  // Style du bouton de soumission
  imgStyle?: object  // Style de l'image
  imgDiv?: object  // Style du conteneur de l'image
  placeHolder?: string  // Texte de placeholder
}

const InputField = ({
  formStyle,
  comId,
  fillerText,
  parentId,
  mode,
  customImg,
  inputStyle,
  cancelBtnStyle,
  submitBtnStyle,
  imgStyle,
  imgDiv,
  placeHolder
}: InputFieldProps) => {
  // Déclaration de l'état local `text` qui contient la valeur du champ de texte
  const [text, setText] = useState('')

  // Utilisation de `useEffect` pour mettre à jour le texte initial avec `fillerText` si fourni
  useEffect(() => {
    if (fillerText) {
      setText(fillerText)
    }
  }, [fillerText])

  // Récupération du contexte global
  const globalStore: any = useContext(GlobalContext)

  // Fonction qui gère le mode d'édition des commentaires
  const editMode = async (advText?: string) => {
    const textToSend = advText ? advText : text  // Si `advText` est fourni, l'utiliser, sinon utiliser le texte local

    // Appel des actions pour éditer un commentaire
    return (
      await globalStore.onEdit(textToSend, comId, parentId),
      globalStore.onEditAction &&
        (await globalStore.onEditAction({
          userId: globalStore.currentUserData.currentUserId,  // Utilisateur actuel
          comId: comId,
          avatarUrl: globalStore.currentUserData.currentUserImg,  // Avatar de l'utilisateur
          userProfile: globalStore.currentUserData.currentUserProfile || null,  // Profil de l'utilisateur
          fullName: globalStore.currentUserData.currentUserFullName,  // Nom complet de l'utilisateur
          text: textToSend,  // Texte mis à jour
          parentOfEditedCommentId: parentId  // ID du parent si applicable
        }))
    )
  }

  // Fonction qui gère le mode de réponse aux commentaires
  const replyMode = async (replyUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text  // Si `advText` est fourni, l'utiliser, sinon utiliser le texte local

    // Appel des actions pour répondre à un commentaire
    return (
      await globalStore.onReply(textToSend, comId, parentId, replyUuid),
      globalStore.onReplyAction &&
        (await globalStore.onReplyAction({
          userId: globalStore.currentUserData.currentUserId,
          repliedToCommentId: comId,  // ID du commentaire auquel répondre
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile || null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,
          parentOfRepliedCommentId: parentId,  // ID du parent si applicable
          comId: replyUuid  // ID de la réponse
        }))
    )
  }

  // Fonction qui gère le mode de soumission d'un nouveau commentaire
  const submitMode = async (createUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text  // Si `advText` est fourni, l'utiliser, sinon utiliser le texte local

    // Appel des actions pour soumettre un nouveau commentaire
    return (
      await globalStore.onSubmit(textToSend, createUuid),
      globalStore.onSubmitAction &&
        (await globalStore.onSubmitAction({
          userId: globalStore.currentUserData.currentUserId,
          comId: createUuid,  // ID du commentaire à créer
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile || null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,  // Texte du commentaire
          replies: []  // Liste des réponses (vide pour un nouveau commentaire)
        }))
    )
  }

  // Fonction qui gère la soumission du formulaire selon le mode (édition, réponse, soumission)
  const handleSubmit = async (event: any, advText?: string) => {
    event.preventDefault()  // Empêche le comportement par défaut du formulaire
    const createUuid = uuidv4()  // Génère un ID unique pour un nouveau commentaire
    const replyUuid = uuidv4()  // Génère un ID unique pour une réponse

    // Selon le mode, appeler la fonction appropriée pour éditer, répondre ou soumettre un commentaire
    mode === 'editMode'
      ? editMode(advText)  // Mode édition
      : mode === 'replyMode'
      ? replyMode(replyUuid, advText)  // Mode réponse
      : submitMode(createUuid, advText)  // Mode soumission

    // Réinitialise le texte après la soumission
    setText('')
  }

  return (
    <div>
      {/* Choix entre un champ de saisie avancé ou régulier selon la valeur de `globalStore.advancedInput` */}
      {globalStore.advancedInput ? (
        <AdvancedInput
          handleSubmit={handleSubmit}
          text={mode === 'editMode' ? text : ''}  // Si en mode édition, afficher le texte actuel
          formStyle={formStyle}
          mode={mode}
          cancelBtnStyle={cancelBtnStyle}
          submitBtnStyle={submitBtnStyle}
          comId={comId}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          placeHolder={placeHolder}
        />
      ) : (
        <RegularInput
          formStyle={formStyle}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          mode={mode}
          inputStyle={inputStyle}
          cancelBtnStyle={cancelBtnStyle}
          comId={comId}
          submitBtnStyle={submitBtnStyle}
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}  // Fonction pour mettre à jour le texte dans le champ de saisie
          placeHolder={placeHolder}
        />
      )}
    </div>
  )
}

export default InputField
