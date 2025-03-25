import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider' // Importation du contexte global pour accéder aux données globales
import { EditorState, ContentState, convertToRaw } from 'draft-js' // Importation de Draft.js pour la gestion de l'éditeur
import { Editor } from 'react-draft-wysiwyg' // Importation de l'éditeur riche
import draftToHtml from 'draftjs-to-html' // Utilisé pour convertir le contenu en HTML
import htmlToDraft from 'html-to-draftjs' // Utilisé pour convertir HTML en contenu Draft.js

// Définition des propriétés attendues par le composant AdvancedInput
interface AdvancedInputProps {
  formStyle?: object
  handleSubmit: Function
  mode?: string
  cancelBtnStyle?: object
  submitBtnStyle?: object
  comId?: string
  imgStyle?: object
  imgDiv?: object
  customImg?: string
  text: string
  placeHolder?: string
}

// Définition du composant AdvancedInput
const AdvancedInput = ({
  formStyle,
  handleSubmit,
  submitBtnStyle,
  cancelBtnStyle,
  mode,
  comId,
  imgDiv,
  imgStyle,
  customImg,
  text,
  placeHolder
}: AdvancedInputProps) => {
  // Initialisation de l'état pour stocker le HTML de l'éditeur
  const [html, setHtml] = useState('<p></p>')

  // Récupération du contexte global
  const globalStore: any = useContext(GlobalContext)

  // Mise à jour de l'état HTML lorsque le texte change
  useEffect(() => {
    if (text != '') {
      setHtml(text) // Si le texte n'est pas vide, on met à jour l'état html
    }
  }, [text])

  // Conversion du contenu HTML en contenu Draft.js (contentState)
  useEffect(() => {
    if (html != '<p></p>') {
      setEditor(EditorState.createWithContent(contentState)) // Si le HTML change, on met à jour l'état de l'éditeur
    }
  }, [html])

  // Conversion du HTML en contenu Draft.js
  const contentBlock = htmlToDraft(html)
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  )

  // Initialisation de l'état de l'éditeur avec le contenu Draft.js
  const [editorState, setEditor] = useState(
    EditorState.createWithContent(contentState)
  )

  // État pour gérer le texte de l'éditeur sous forme de chaîne
  const [editText, setEditText] = useState<string>('')

  // Fonction pour gérer les changements dans l'état de l'éditeur
  const onEditorStateChange: Function = (editorState: any) => {
    setEditor(editorState) // Mise à jour de l'état de l'éditeur à chaque modification
  }

  // Conversion de l'état de l'éditeur en HTML lors de chaque changement d'éditeur
  useEffect(() => {
    setEditText(
      draftToHtml(convertToRaw(editorState.getCurrentContent())).trim()
    )
  }, [editorState]) // Ce hook se déclenche chaque fois que l'état de l'éditeur change

  return (
    <div className='advanced-overlay'>
      <div className='userImg' style={imgDiv}>
        {/* Affichage de l'image de l'utilisateur */}
        <a target='_blank' href={globalStore.currentUserData.currentUserProfile}>
          <img
            src={
              globalStore.customImg ||
              customImg ||
              globalStore.currentUserData.currentUserImg
            }
            style={globalStore.imgStyle || imgStyle}
            alt='userIcon'
            className='imgdefault'
          />
        </a>
      </div>

      <div className='advanced-input'>
        {/* Formulaire d'édition */}
        <form
          className='form advanced-form'
          style={globalStore.formStyle || formStyle}
          onSubmit={async (e) =>
            editText != '<p></p>'
              ? (await handleSubmit(e, editText),
                setEditor(EditorState.createEmpty())) // Soumettre le texte si ce n'est pas vide
              : null
          }
        >
          <div className='advanced-border'>
            {/* Éditeur riche de Draft.js */}
            <Editor
              editorState={editorState}
              placeholder={placeHolder ? placeHolder : 'Type your reply here.'}
              onEditorStateChange={(editorState) =>
                onEditorStateChange(editorState) // Gérer les changements dans l'état de l'éditeur
              }
              toolbar={{
                options: [
                  'inline', // Options de formatage en ligne
                  'blockType', // Options de type de bloc
                  'list', // Liste d'options
                  'colorPicker', // Sélecteur de couleur
                  'link', // Gestion des liens
                  'emoji', // Emoji
                  'image' // Gestion des images
                ],
                link: {
                  inDropdown: false, // Options liées aux liens
                  showOpenOptionOnHover: true,
                },
                image: {
                  inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', // Types d'images acceptés
                  previewImage: false, // Ne pas afficher d'aperçu d'image
                },
                inline: {
                  options: [
                    'bold', 'italic', 'underline', 'strikethrough', 'monospace'
                  ], // Options de mise en forme du texte
                },
                blockType: {
                  inDropdown: true, // Options de type de bloc
                  options: ['Normal', 'Blockquote', 'Code'],
                },
                list: {
                  inDropdown: false, // Options de liste
                  options: ['unordered', 'ordered'],
                },
              }}
            />
          </div>

          <div className='advanced-btns'>
            {/* Boutons d'annulation et de soumission */}
            {mode && (
              <button
                className='advanced-cancel cancelBtn'
                style={globalStore.cancelBtnStyle || cancelBtnStyle}
                type='button'
                onClick={() =>
                  mode === 'editMode'
                    ? globalStore.handleAction(comId, true)
                    : globalStore.handleAction(comId, false)
                }
              >
                Cancel
              </button>
            )}
            <button
              className='advanced-post postBtn'
              type='submit'
              disabled={editText === '<p></p>' ? true : false} // Désactiver le bouton si le texte est vide
              style={globalStore.submitBtnStyle || submitBtnStyle}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdvancedInput
