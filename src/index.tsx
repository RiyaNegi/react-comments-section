import * as React from 'react'
import CommentSectionComponent from './components/CommentSectionComponent/Index' // Importation du composant de la section des commentaires
import GlobalProvider from './context/Provider' // Importation du fournisseur de contexte global
import './Index.scss' // Importation du fichier de styles

// Définition des types pour les props du composant CommentSection
interface CommentSectionProps {
  currentUser: {
    currentUserId: string // ID de l'utilisateur actuel
    currentUserImg: string // URL de l'image de profil de l'utilisateur actuel
    currentUserProfile: string // Profil de l'utilisateur (optionnel)
    currentUserFullName: string // Nom complet de l'utilisateur actuel
  } | null
  replyTop?: boolean // Définit si la réponse se fait en haut
  customImg?: string // Image personnalisée pour les commentaires (optionnel)
  inputStyle?: object // Styles personnalisés pour le champ de saisie (optionnel)
  formStyle?: object // Styles personnalisés pour le formulaire (optionnel)
  submitBtnStyle?: object // Styles personnalisés pour le bouton de soumission (optionnel)
  cancelBtnStyle?: object // Styles personnalisés pour le bouton d'annulation (optionnel)
  overlayStyle?: object // Styles personnalisés pour l'overlay (optionnel)
  imgStyle?: object // Styles personnalisés pour les images (optionnel)
  replyInputStyle?: object // Styles personnalisés pour le champ de saisie de la réponse (optionnel)
  commentsCount?: number // Nombre de commentaires à afficher (optionnel)
  hrStyle?: object // Styles personnalisés pour la ligne horizontale (optionnel)
  titleStyle?: object // Styles personnalisés pour le titre (optionnel)
  onSubmitAction?: Function // Action à effectuer lors de la soumission d'un commentaire (optionnel)
  onDeleteAction?: Function // Action à effectuer lors de la suppression d'un commentaire (optionnel)
  onReplyAction?: Function // Action à effectuer lors de la réponse à un commentaire (optionnel)
  onEditAction?: Function // Action à effectuer lors de l'édition d'un commentaire (optionnel)
  customNoComment?: Function // Fonction personnalisée pour afficher un message lorsque il n'y a pas de commentaires (optionnel)
  currentData?: Function // Fonction pour récupérer les données actuelles (optionnel)
  removeEmoji?: boolean // Définit si les emojis doivent être retirés (optionnel)
  advancedInput?: boolean // Détermine si un champ de saisie avancé est utilisé (optionnel)
  placeHolder?: string // Texte de remplacement pour le champ de saisie (optionnel)
  showTimestamp?: boolean // Définit si l'horodatage doit être affiché (optionnel)
  commentData: Array<{
    userId: string // ID de l'utilisateur ayant laissé le commentaire
    comId: string // ID du commentaire
    fullName: string // Nom complet de l'utilisateur
    avatarUrl: string // URL de l'image de profil de l'utilisateur
    text: string // Contenu du commentaire
    userProfile?: string // Profil de l'utilisateur (optionnel)
    timestamp?: string // Horodatage du commentaire (optionnel)
    replies?: Array<{
      userId: string // ID de l'utilisateur ayant répondu
      comId: string // ID de la réponse
      fullName: string // Nom complet de l'utilisateur ayant répondu
      avatarUrl: string // URL de l'image de profil de l'utilisateur ayant répondu
      text: string // Contenu de la réponse
      timestamp?: string // Horodatage de la réponse (optionnel)
      userProfile?: string // Profil de l'utilisateur ayant répondu (optionnel)
    }> // Liste des réponses à ce commentaire (optionnel)
  }>
}

// Le composant CommentSection qui gère l'affichage des commentaires et des actions
export const CommentSection = ({
  currentUser,
  customImg,
  inputStyle,
  formStyle,
  submitBtnStyle,
  cancelBtnStyle,
  overlayStyle,
  replyInputStyle,
  imgStyle,
  replyTop,
  commentsCount,
  commentData,
  placeHolder,
  showTimestamp,
  hrStyle,
  titleStyle,
  removeEmoji,
  onSubmitAction,
  onDeleteAction,
  onReplyAction,
  onEditAction,
  customNoComment,
  currentData,
  advancedInput
}: CommentSectionProps) => {
  return (
    // Le GlobalProvider est utilisé pour fournir les données globales aux enfants du composant
    <GlobalProvider
      currentUser={currentUser} // Utilisateur actuel
      replyTop={replyTop} // Afficher la réponse en haut ?
      customImg={customImg} // Image personnalisée pour les commentaires
      inputStyle={inputStyle} // Style personnalisé pour le champ de saisie
      formStyle={formStyle} // Style personnalisé pour le formulaire
      submitBtnStyle={submitBtnStyle} // Style personnalisé pour le bouton de soumission
      cancelBtnStyle={cancelBtnStyle} // Style personnalisé pour le bouton d'annulation
      replyInputStyle={replyInputStyle} // Style personnalisé pour le champ de saisie de la réponse
      imgStyle={imgStyle} // Style personnalisé pour les images
      commentsCount={commentsCount} // Nombre de commentaires à afficher
      commentData={commentData} // Données des commentaires à afficher
      onSubmitAction={onSubmitAction} // Action à effectuer lors de la soumission d'un commentaire
      onDeleteAction={onDeleteAction} // Action à effectuer lors de la suppression d'un commentaire
      onReplyAction={onReplyAction} // Action à effectuer lors de la réponse à un commentaire
      onEditAction={onEditAction} // Action à effectuer lors de l'édition d'un commentaire
      currentData={currentData} // Fonction pour récupérer les données actuelles
      removeEmoji={removeEmoji} // Retirer les emojis ?
      advancedInput={advancedInput} // Utiliser un champ de saisie avancé ?
      placeHolder={placeHolder} // Texte de remplacement pour le champ de saisie
    >
      {/* Le composant CommentSectionComponent est chargé d'afficher la liste des commentaires et autres éléments */}
      <CommentSectionComponent
        overlayStyle={overlayStyle} // Style pour l'overlay
        hrStyle={hrStyle} // Style pour la ligne horizontale
        titleStyle={titleStyle} // Style du titre
        customNoComment={customNoComment} // Fonction pour personnaliser l'affichage lorsqu'il n'y a pas de commentaires
        showTimestamp={showTimestamp} // Afficher l'horodatage ?
      />
    </GlobalProvider>
  )
}
