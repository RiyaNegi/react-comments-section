import React, { useRef, useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../context/Provider'  // Importation du contexte global
import Picker from 'emoji-picker-react'  // Importation de la bibliothèque pour choisir des emojis
import './InputField.scss'  // Importation du style

// Hook personnalisé pour détecter les clics en dehors d'un élément
function useOutsideAlerter(ref: any, setOpen: Function) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      // Si le clic est en dehors de l'élément référencé, on ferme l'emoji picker
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(!open)
      }
    }
    // Ajout d'un événement pour détecter les clics
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Nettoyage de l'événement lorsqu'on quitte le composant
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

// Interface pour les props du composant
interface EmojiInputProps {
  text: string  // Texte actuel dans le champ de saisie
  setText: Function  // Fonction pour mettre à jour le texte
  mode?: string  // Mode dans lequel le champ est utilisé (réponse, édition, etc.)
  inputStyle?: object  // Style personnalisé pour l'input
  placeHolder?: string  // Texte d'exemple dans l'input
}

const EmojiInput = ({
  text,  // Texte du champ de saisie
  setText,  // Fonction pour mettre à jour le texte
  mode,  // Mode d'affichage
  inputStyle,  // Style personnalisé
  placeHolder  // Placeholder dans l'input
}: EmojiInputProps) => {
  const [open, setOpen] = useState(false)  // Etat pour savoir si l'emoji picker est ouvert
  const [chosenEmoji, setChosenEmoji] = useState<{ emoji?: any }>()  // Etat pour l'emoji choisi
  const wrapperRef = useRef(null)  // Référence pour l'élément contenant le picker
  useOutsideAlerter(wrapperRef, setOpen)  // Utilisation du hook pour gérer les clics en dehors

  const globalStore: any = useContext(GlobalContext)  // Récupération du contexte global

  // Mise à jour du texte chaque fois qu'un emoji est choisi
  useEffect(() => {
    if (chosenEmoji) {
      let newText = text + ' ' + chosenEmoji.emoji  // Ajout de l'emoji au texte
      setText(newText)  // Mise à jour du texte
    }
  }, [chosenEmoji])

  // Fonction appelée lors du choix d'un emoji
  const onEmojiClick = (event: any, emojiObject: { emoji?: any }) => {
    event  // On n'utilise pas l'event ici mais il doit être présent
    setChosenEmoji(emojiObject)  // Mise à jour de l'emoji choisi
  }

  return (
    <div className='emoji-input'>
      {/* Champ de saisie avec un style conditionnel selon le mode */}
      <input
        className='postComment'
        style={
          mode === 'replyMode' || mode === 'editMode'
            ? globalStore.replyInputStyle  // Style spécifique pour les réponses ou l'édition
            : globalStore.inputStyle || inputStyle  // Style global ou personnalisé
        }
        placeholder={placeHolder ? placeHolder : 'Type your reply here.'}  // Placeholder conditionnel
        type='text'
        value={text}  // Valeur actuelle du texte
        onChange={(e) => setText(e.target.value)}  // Mise à jour du texte lors de la saisie
      />
      {/* Icône d'emoji qui ouvre/ferme le picker */}
      <div className='emoji-icon' onClick={() => setOpen(!open)}></div>
      {/* Si le picker est ouvert, on l'affiche */}
      {open ? (
        <div ref={wrapperRef}>
          <Picker onEmojiClick={onEmojiClick} />  {/* Affichage du picker d'emojis */}
        </div>
      ) : null}
    </div>
  )
}

export default EmojiInput
