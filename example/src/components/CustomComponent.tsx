import React from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useState } from 'react'

const CustomComponent = () => {
  const [data] = useState([
    {
      userId: '01a',
      comId: '012',
      fullName: 'Riya Negi',
      avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'Hey, Loved your blog! ',
      replies: [
        {
          userId: '02a',
          comId: '013',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Adam Scott',
          avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
          text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
        },
        {
          userId: '01a',
          comId: '014',
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
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I have a doubt about the 4th point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    }
  ])

  const customNoComment = () => (
    <div className='no-com'>No comments wohoooo!</div>
  )
  return (
    <div style={{ width: '100%' }}>
      <a
        style={{ color: 'black', cursor: 'pointer' }}
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/CustomComponent.tsx'
      >
        <span className='title'>Custom Component</span>
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
        showTimestamp={false}
        hrStyle={{ border: '0.5px solid #ff0072' }}
        titleStyle={{ color: '#f2f2f2' }}
        commentsCount={8}
        commentData={data}
        currentData={(data: any) => {
          console.log('current data', data)
        }}
        logIn={{
          onLogin: () => alert('Call login function '),
          signUpLink: 'http://localhost:3001/'
        }}
        onSubmitAction={(data: {
          userId: string
          comId: string
          avatarUrl: string
          userProfile?: string
          fullName: string
          text: string
          timestamp?: Date
          replies: any
        }) => console.log('check submit, ', data)}
        onDeleteAction={(data: any) => console.log('comment was deleted', data)}
        onReplyAction={(data: {
          userId: string
          parentOfRepliedCommentId: string
          repliedToCommentId: string
          avatarUrl: string
          userProfile?: string
          fullName: string
          text: string
          timestamp?: Date
        }) => console.log('check reply, ', data)}
        onEditAction={(data: any) => console.log('check edit', data)}
        customNoComment={() => customNoComment()}
        imgStyle={{ borderRadius: '0%' }}
        customImg='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60'
        inputStyle={{ border: '1px solid rgb(208 208 208)' }}
        formStyle={{ backgroundColor: 'white' }}
        submitBtnStyle={{ border: '1px solid black', backgroundColor: 'black' }}
        cancelBtnStyle={{
          border: '1px solid gray',
          backgroundColor: 'gray',
          color: 'white'
        }}
        removeEmoji={true}
        overlayStyle={{ backgroundColor: '#0f0d29', color: 'white' }}
        replyInputStyle={{ borderBottom: '1px solid black', color: 'black' }}
      />
    </div>
  )
}

export default CustomComponent
