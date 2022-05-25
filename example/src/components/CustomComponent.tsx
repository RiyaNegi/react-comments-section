import React, { useState } from 'react'
import { CommentSectionComponent } from 'react-comments-section'
import 'react-comments-section/dist/index.css'

const CustomComponent = () => {
  const [data, setData] = useState([
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
    <div>
      <a
        style={{ color: 'black', cursor: 'pointer' }}
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/CustomComponent.tsx'
      >
        <span className='title'>Custom Component</span>
      </a>
      <CommentSectionComponent
        currentUser={{
          currentUserId: '01a',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/riya-negi-8879631a9/',
          currentUserFullName: 'Riya Negi'
        }}
        hrStyle={{ color: 'pink' }}
        titleStyle={{ color: 'blue' }}
        commentsCount={8}
        commentData={data}
        onSubmitAction={() =>
          setData([
            {
              userId: '02a',
              comId: '07',
              fullName: 'Adam Scott',
              text: 'Follow my page for more such interesting blogs!😇',
              avatarUrl:
                'https://ui-avatars.com/api/name=Adam&background=random',
              userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
              replies: []
            },
            {
              userId: '02a',
              comId: '015',
              fullName: 'Robert Jae',
              avatarUrl:
                'https://ui-avatars.com/api/name=Robert&background=random',
              text: 'Woah pretty helpful! how did you solve for x?',
              userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
              replies: [
                {
                  userId: '01b',
                  comId: '016',
                  userProfile:
                    'https://www.linkedin.com/in/riya-negi-8879631a9/',
                  fullName: 'Adam Scott',
                  text: 'Thanks! refer to this link -> acs.com',
                  avatarUrl:
                    'https://ui-avatars.com/api/name=Adam&background=random'
                }
              ]
            }
          ])
        }
        onDeleteAction={() => alert('comment was deleted')}
        onReplyAction={() => alert('comment was deleted')}
        onEditAction={() => alert('checl')}
        customNoComment={() => customNoComment()}
        imgStyle={{ borderRadius: '0%' }}
        customImg='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60'
        inputStyle={{ border: '1px solid red' }}
        formStyle={{ backgroundColor: 'aqua' }}
        submitBtnStyle={{ backgroundColor: 'black' }}
        cancelBtnStyle={{ backgroundColor: 'yellow' }}
        overlayStyle={{ backgroundColor: 'black', color: 'white' }}
      />
    </div>
  )
}

export default CustomComponent
