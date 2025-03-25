import React from 'react'
import './InputField.scss'  // Import du fichier de styles SCSS
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'  // Import du contexte global
import EmojiInput from './EmojiInput'  // Import du composant d'entrée avec emojis

// Interface des props pour le composant RegularInput
interface RegularInputProps {
  formStyle?: object  // Style personnalisé pour le formulaire
  comId?: string  // ID de la communication (commentaire ou réponse)
  mode?: string  // Mode du formulaire (réponse, édition, etc.)
  customImg?: string  // Image personnalisée de l'utilisateur
  inputStyle?: object  // Style personnalisé pour le champ de saisie
  cancelBtnStyle?: object  // Style personnalisé pour le bouton "Annuler"
  submitBtnStyle?: object  // Style personnalisé pour le bouton "Envoyer"
  imgStyle?: object  // Style personnalisé pour l'image de l'utilisateur
  imgDiv?: object  // Style personnalisé pour le conteneur de l'image
  handleSubmit: Function  // Fonction de soumission du formulaire
  text: string  // Texte du champ de saisie
  setText: Function  // Fonction pour mettre à jour le texte
  placeHolder?: string  // Placeholder du champ de saisie
}

const RegularInput = ({
  formStyle,
  imgDiv,
  imgStyle,
  customImg,
  mode,
  inputStyle,
  cancelBtnStyle,
  comId,
  submitBtnStyle,
  handleSubmit,
  text,
  setText,
  placeHolder
}: RegularInputProps) => {
  const globalStore: any = useContext(GlobalContext)  // Récupération du contexte global

  return (
    // Formulaire avec un style personnalisé ou par défaut venant du contexte
    <form
      className='form'
      style={globalStore.formStyle || formStyle}  // Priorité au style global ou personnalisé
      onSubmit={() => handleSubmit}  // Appel de la fonction handleSubmit lors de la soumission
    >
      {/* Section pour afficher l'image de l'utilisateur */}
      <div className='userImg' style={imgDiv}>
        <a
          target='_blank'
          href={globalStore.currentUserData.currentUserProfile}  // Lien vers le profil de l'utilisateur
        >
          <img
            src={
              globalStore.customImg ||  // Image personnalisée ou par défaut
              customImg ||
              globalStore.currentUserData.currentUserImg
            }
            style={globalStore.imgStyle || imgStyle}  // Style personnalisé pour l'image
            alt='userIcon'  // Texte alternatif pour l'image
            className='imgdefault'  // Classe CSS par défaut
          />
        </a>
      </div>

      {/* Champ de saisie avec ou sans emojis, selon la valeur de globalStore.removeEmoji */}
      {globalStore.removeEmoji ? (
        <input
          className='postComment'
          style={
            mode === 'replyMode' || mode === 'editMode'
              ? globalStore.replyInputStyle  // Style pour le mode réponse ou édition
              : globalStore.inputStyle || inputStyle  // Style global ou personnalisé
          }
          type='text'
          placeholder={placeHolder ? placeHolder : 'Type your reply here.'}  // Placeholder par défaut ou personnalisé
          value={text}  // Valeur actuelle du texte
          onChange={(e) => setText(e.target.value)}  // Mise à jour du texte lors de la saisie
        />
      ) : (
        // Si les emojis sont activés, on affiche le composant EmojiInput
        <EmojiInput
          text={text}
          setText={setText}
          mode={mode}
          inputStyle={inputStyle}
          placeHolder={placeHolder}
        />
      )}

      {/* Si le mode est défini, afficher le bouton "Annuler" */}
      {mode && (
        <button
          className='cancelBtn'
          style={globalStore.cancelBtnStyle || cancelBtnStyle}  // Style du bouton "Annuler"
          type='button'
          onClick={() =>
            mode === 'editMode'
              ? globalStore.handleAction(comId, true)  // Action pour annuler en mode édition
              : globalStore.handleAction(comId, false)  // Action pour annuler dans les autres modes
          }
        >
          Cancel
        </button>
      )}

      {/* Bouton "Envoyer", désactivé si le champ de texte est vide */}
      <button
        className='postBtn'
        type='submit'
        disabled={text != '' ? false : true}  // Le bouton est désactivé si le texte est vide
        style={globalStore.submitBtnStyle || submitBtnStyle}  // Style du bouton "Envoyer"
        onClick={(e) => (text ? handleSubmit(e) : null)}  // Soumission du formulaire si du texte est présent
      >
        Post
      </button>
    </form>
  )
}

export default RegularInput
