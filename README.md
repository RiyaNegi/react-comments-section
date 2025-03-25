# react-comments-section

### 🚀 À propos de ce fork
Ce projet est un fork du projet original [react-comments-section](https://github.com/RiyaNegi/react-comments-section) créé par [RiyaNegi](https://github.com/RiyaNegi). Je ne suis pas l'auteur du plugin, mais je travaille sur une version modifiée ou adaptée.

### 📌 Objectif de cette contribution
Le but de cette contribution est de démontrer ma capacité à :

- Modifier une bibliothèque React existante.

- Comprendre et analyser le code écrit par d'autres développeurs.

- Améliorer et optimiser un code déjà existant.

## Installation

Installez la dernière version !

```bash
npm i react-comments-section
```

## Documentation détaillée : https://riyanegi.github.io/react-comments-documentation/

`react-comments-section`  est un composant React simple mais multifonctionnel qui vous permet d'ajouter une section de commentaires similaire à celles de YouTube ou Instagram dans votre application React.
`react-comments-section`  est particulièrement utile pour les développeurs débutants qui souhaitent intégrer une section de commentaires sans se plonger dans sa complexité. Cette bibliothèque fournit une section de commentaires entièrement fonctionnelle avec les fonctionnalités suivantes :

L'utilisateur peut répondre aux commentaires

L'utilisateur peut modifier ses propres commentaires

L'utilisateur peut supprimer ses propres commentaires

Démo en ligne de la bibliothèque → https://riyanegi.github.io/react-comments-section/

## Exemple par défaut

![commentbox](https://github.com/RiyaNegi/react-comments-section/blob/main/example/blob/default.png?raw=true)

## Saisie avancée (éditeur de texte enrichi)

![commentbox](https://github.com/RiyaNegi/react-comments-section/blob/main/example/blob/advanced.png?raw=true)

## Utilisation

### Implémentation avec Hooks (TypeScript)

Voici un exemple de base pour tester la bibliothèque dans votre projet. Cette bibliothèque fonctionne avec un système d'utilisateur, voici quelques points importants à retenir :

- currentUser [obligatoire] : Pour une utilisation sans utilisateur connecté, passez currentUser={null}.
- logIn [obligatoire] : L'utilisateur peut être redirigé vers une page de connexion/inscription via cette prop.
- currentData [optionnel] : Retourne un objet contenant les données mises à jour après chaque action (ajout, réponse, modification ou suppression de commentaire).
- onSubmitAction : Retourne un objet avec les informations nécessaires pour effectuer un appel API après la soumission d'un commentaire.
  For more details check out the props list in our detailed documentation.
  Voici à quoi ressemble l'utilisation du composant par défaut :

```jsx
import React from 'react'
import { CommentSection} from 'react-comments-section'
import 'react-comments-section/dist/index.css'

const DefaultComponent = () => {
  const data =[
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I think you have a point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      timestamp: '2024-09-28T12:34:56Z'
      replies: [],
    }
  ]
  return <CommentSection
        currentUser={{
          currentUserId: '01a',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/riya-negi-8879631a9/',
          currentUserFullName: 'Riya Negi'
        }}
        logIn={{
          onLogin: () => alert('Call login function '),
          signUpLink: 'http://localhost:3001/'
        }}
        commentData={data}
        placeholder="Write your comment..."
        onSubmitAction={(data: {
          userId: string
          comId: string
          avatarUrl: string
          userProfile?: string
          fullName: string
          text: string
          replies: any
          commentId: string
        }) => console.log('check submit, ', data)}
        currentData={(data: any) => {
          console.log('current data', data)
        }}
      />
}

export default DefaultComponent

```

### Implémentation avec une classe

```jsx
import React, { PureComponent } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'

class ClassComponent extends PureComponent {
  state = {
    data: [
      {
        userId: '01a',
        comId: '012',
        fullName: 'Riya Negi',
        avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
        userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        text: 'Hey, Loved your blog! ',
        timestamp: '2024-09-28T12:34:56Z'
        replies: []
      },
      {
        userId: '02b',
        comId: '017',
        fullName: 'Lily',
        userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        text: 'I have a doubt about the 4th point🤔',
        avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
        timestamp: '2024-09-28T12:34:56Z'
        replies: []
      }
    ]
  }

  onSubmitAction = (data: any) => {
    console.log('this comment was posted!', data)
  }

  customNoComment = () => <div className='no-com'>No comments wohoooo!</div>

  render() {
    return (
      <CommentSection
      currentUser={{
        currentUserId: '01a',
        currentUserImg:
          'https://ui-avatars.com/api/name=Riya&background=random',
        currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        currentUserFullName: 'Riya Negi'
      }}
      commentData={this.state.data}
      onSubmitAction={(data: any) => this.onSubmitAction(data)}
      customNoComment={() => this.customNoComment()}
      logIn={{
        onLogin: () => alert('Call login function '),
        signUpLink: 'http://localhost:3001/'
      }}
      placeholder="Write your comment..."
    />)
  }
}

export default ClassComponent
```

## License

MIT © [RiyaNegi](https://github.com/RiyaNegi)
