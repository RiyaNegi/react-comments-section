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
        timestamp: `${new Date()}`,
        replies: [
          {
            userId: '02a',
            comId: '013',
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            fullName: 'Adam Scott',
            avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
            text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰',
            timestamp: `${new Date()}`
          },
          {
            userId: '01a',
            comId: '014',
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            fullName: 'Riya Negi',
            avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
            text: 'thanks!😊',
            timestamp: `${new Date()}`
          }
        ]
      },
      {
        userId: '02b',
        comId: '017',
        fullName: 'Lily',
        userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        text: 'I have a doubt about the 4th point🤔',
        avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
        timestamp: `${new Date()}`,
        replies: []
      }
    ]
  }
  onSubmitAction = (data: any) => {
    console.log('this comment was posted!,data', data)
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <a
          style={{ color: 'black', cursor: 'pointer' }}
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/ClassComponent.tsx'
        >
          <span className='title'>Class Component</span>
        </a>
        <CommentSection
          currentUser={{
            currentUserId: '01a',
            currentUserImg:
              'https://ui-avatars.com/api/name=Riya&background=random',
            currentUserProfile:
              'https://www.linkedin.com/in/riya-negi-8879631a9/',
            currentUserFullName: 'Riya Negi'
          }}
          placeHolder='Write your comment...'
          commentData={this.state.data}
          onSubmitAction={(data: any) => this.onSubmitAction(data)}
          logIn={{
            onLogin: () => alert('Call login function '),
            signUpLink: 'http://localhost:3001/'
          }}
        />
      </div>
    )
  }
}

export default ClassComponent
