import React from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'

const DefaultComponent = () => {
  const data = [
    {
      userId: '01a',
      comId: '012',
      fullName: 'Riya Negi',
      createdAt: "2023-04-23",
      updatedAt: "",
      avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'Hey, Loved your blog! ',
      replies: [
        {
          userId: '02a',
          comId: '013',
          createdAt: "2023-04-23",
          updatedAt: "",
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Adam Scott',
          avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
          text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
        },
        {
          userId: '01a',
          comId: '014',
          createdAt: "2023-04-23",
          updatedAt: "",
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Riya Negi',
          avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
          text: 'thanks!😊'
        }
      ]
    },
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      createdAt: "2023-04-23",
      updatedAt: "",
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I have a doubt about the 4th point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    }
  ]
  return (
    <div style={{ width: '100%' }}>
      <a
        style={{ color: 'black', cursor: 'pointer' }}
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/DefaultComponent.tsx'
      >
        <span className='title'>Default Component</span>
      </a>
      <CommentSection
        currentUser={{
          currentUserId: '01a',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/riya-negi-8879631a9/',
          currentUserFullName: 'Riya Negi',
          currentUserCreatedAt: "2023-04-23",
          currentUserUpdatedAt: ""
        }}
        commentData={data}
        logIn={{
          loginLink: 'http://localhost:3001/',
          signupLink: 'http://localhost:3001/'
        }}
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
          console.log('curent data', data)
        }}
      />
    </div>
  )
}

export default DefaultComponent
