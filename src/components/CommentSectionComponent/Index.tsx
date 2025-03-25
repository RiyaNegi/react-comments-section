// Importation des composants et des fichiers nécessaires
import CommentStructure from '../CommentStructure.tsx/Index' // Structure d'un commentaire individuel
import InputField from '../InputField/Index' // Champ pour écrire un nouveau commentaire
import './CommentSection.css' // Fichier CSS pour le style du composant
import { useContext } from 'react' // Hook React pour accéder au contexte global
import { GlobalContext } from '../../context/Provider' // Contexte global pour stocker les commentaires et l'utilisateur
import _ from 'lodash' // Librairie utilitaire pour manipuler les tableaux et objets
import React from 'react'
import NoComments from './NoComments' // Composant affiché si aucun commentaire n'existe

// Définition des props du composant
interface CommentSectionProps {
  overlayStyle?: object // Style CSS pour la superposition de la section de commentaires
  hrStyle?: object // Style CSS pour la ligne de séparation
  titleStyle?: object // Style CSS pour le titre de la section de commentaires
  customNoComment?: Function // Fonction personnalisée pour afficher un message si aucun commentaire
  showTimestamp?: boolean // Indique si l'on affiche l'horodatage des commentaires
}

// Définition du composant `CommentSection`
const CommentSection = ({
  overlayStyle,
  hrStyle,
  titleStyle,
  customNoComment,
  showTimestamp = true, // Par défaut, les timestamps sont affichés
}: CommentSectionProps) => {

  // Accès aux données globales (commentaires, utilisateur, etc.) via le contexte
  const globalStore: any = useContext(GlobalContext)

  // Fonction pour compter le nombre total de commentaires (y compris les réponses)
  const totalComments = () => {
    let count = 0
    globalStore.data.map((i: any) => {
      count = count + 1
      i.replies.map(() => (count = count + 1)) // Compte également les réponses aux commentaires
    })
    return count
  }

  return (
    <div className='overlay' style={overlayStyle}>
      {/* Affichage du nombre total de commentaires */}
      <span className='comment-title' style={titleStyle}>
        {globalStore.commentsCount || totalComments()}{' '}
        {totalComments() === 1 ? 'Comment' : 'Comments'}
      </span>

      <hr className='hr-style' style={hrStyle} />

      // Sinon, afficher le champ de saisie pour ajouter un commentaire
      <InputField
        placeHolder={globalStore.placeHolder}
        formStyle={{ margin: '10px 0px' }}
        imgDiv={{ margin: 0 }}
      />


      {/* Affichage des commentaires */}
      {globalStore.data.length > 0 ? (
        globalStore.data.map(
          (i: {
            userId: string
            comId: string
            fullName: string
            avatarUrl: string
            text: string
            userProfile?: string
            replies: Array<any> | undefined
          }) => {
            return (
              <div key={i.comId}>
                {/* Affichage d'un commentaire */}
                <CommentStructure
                  info={i}
                  editMode={
                    _.indexOf(globalStore.editArr, i.comId) === -1
                      ? false
                      : true
                  }
                  replyMode={
                    _.indexOf(globalStore.replyArr, i.comId) === -1
                      ? false
                      : true
                  }
                  showTimestamp={showTimestamp}
                />

                {/* Si le commentaire a des réponses, les afficher */}
                {i.replies &&
                  i.replies.length > 0 &&
                  i.replies.map((j) => {
                    return (
                      <div className='replySection' key={j.comId}>
                        <CommentStructure
                          info={j}
                          parentId={i.comId}
                          editMode={
                            _.indexOf(globalStore.editArr, j.comId) === -1
                              ? false
                              : true
                          }
                          replyMode={
                            _.indexOf(globalStore.replyArr, j.comId) === -1
                              ? false
                              : true
                          }
                          showTimestamp={showTimestamp}
                        />
                      </div>
                    )
                  })}
              </div>
            )
          }
        )
      ) : customNoComment ? (
        // Si aucun commentaire mais une fonction personnalisée est fournie, l'exécuter
        customNoComment()
      ) : (
        // Sinon, afficher le composant par défaut "NoComments"
        <NoComments />
      )}
    </div>
  )
}

export default CommentSection
