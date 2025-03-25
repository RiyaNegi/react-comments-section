import { useState, useContext } from 'react'
import 'react-responsive-modal/styles.css'  // Importation des styles du modal
import { Modal } from 'react-responsive-modal'  // Importation du composant Modal
import { GlobalContext } from '../../context/Provider'  // Importation du contexte global pour accéder aux actions
import React from 'react'

// Définition des types des props du composant
interface DeleteModalProps {
  comId: string  // L'identifiant du commentaire à supprimer
  parentId?: string  // L'identifiant du parent si c'est une réponse (optionnel)
}

const DeleteModal = ({ comId, parentId }: DeleteModalProps) => {
  // Déclaration de l'état local `open` pour gérer l'ouverture et la fermeture du modal
  const [open, setOpen] = useState(false)

  // Fonction pour ouvrir le modal
  const onOpenModal = () => setOpen(true)

  // Fonction pour fermer le modal
  const onCloseModal = () => setOpen(false)

  // Utilisation du contexte global pour accéder aux actions (comme la suppression du commentaire)
  const globalStore: any = useContext(GlobalContext)

  return (
    <div>
      {/* Bouton déclencheur pour ouvrir le modal */}
      <div style={{ width: '100%' }} onClick={onOpenModal}>
        delete
      </div>

      {/* Modal qui demande une confirmation pour supprimer un commentaire */}
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Are you sure?</h2> {/* Titre de la modal */}
        <p>Once you delete this comment it will be gone forever.</p> {/* Message de confirmation de suppression */}

        {/* Conteneur des boutons (supprimer et annuler) */}
        <div className='deleteBtns'>
          {/* Bouton pour confirmer la suppression */}
          <button
            className='delete'
            onClick={async () => (
              await globalStore.onDelete(comId, parentId), // Appel de la fonction de suppression du commentaire dans le contexte
              globalStore.onDeleteAction &&  // Si la fonction `onDeleteAction` est définie
                (await globalStore.onDeleteAction({
                  comIdToDelete: comId,  // Passe l'ID du commentaire à supprimer
                  parentOfDeleteId: parentId  // Passe l'ID du parent si c'est une réponse
                }))
            )}
          >
            Delete {/* Texte du bouton de suppression */}
          </button>

          {/* Bouton pour annuler la suppression */}
          <button className='cancel' onClick={onCloseModal}>
            Cancel {/* Texte du bouton d'annulation */}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
