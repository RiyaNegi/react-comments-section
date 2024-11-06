import React from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useState } from 'react'

const AdvancedComponent = () => {
  let date = new Date()

  const [data] = useState([
    {
      userId: '01a',
      comId: '012',
      fullName: 'Riya Negi',
      avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: `<p>Hey <strong>loved</strong> your blog! Can you show me some other ways to <del><em>fix</em></del>  solve this?🤔<br>Here's my <a href="https://www.linkedin.com/in/riya-negi-8879631a9/" target="_blank">Linkedin Profile</a> to reach out.</p>`,
      timestamp: `${new Date(
        date.getTime() - 5 * 60 * 60 * 1000
      ).toISOString()}`,
      replies: [
        {
          userId: '02a',
          comId: '013',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Adam Scott',
          avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
          text: `<p>Yeah sure try adding this line to your code. You need to pass <span style="color: rgb(147,101,184);">event</span><span style="color: rgb(26,188,156);"> </span><span style="color: rgb(0,0,0);">as a param. </span></p>
          <pre>event.preventDefault()</pre>
          <p>Best of luck with your project! <br></p>
          <img src="https://c.tenor.com/4cR1jMpsrEgAAAAC/snoopy-cheerleader.gif" alt="undefined" style="height: auto;width: auto"/>
          <p></p>`,
          timestamp: `${new Date(
            date.getTime() - 30 * 60 * 1000
          ).toISOString()}`
        },
        {
          userId: '01a',
          comId: '014',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Riya Negi',
          avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
          text: '<p><strong>OMG!</strong> it worked! <span style="color: rgb(209,72,65);">DO NOT stop this blog series!!!!</span> 💃</p>',
          timestamp: `${new Date()}`
        }
      ]
    },
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: `<blockquote><strong>DRY </strong>- is the right of passage to good coding</blockquote>
      <p>True story brother!! <em>Amen to that!  </em>For anyone wondering DRY is&nbsp;</p>
      <ol>
      <li>Don't</li>
      <li>Repeat</li>
      <li>Yoursef</li>
      </ol>`,
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      timestamp: `${new Date(
        date.getTime() - 3 * 60 * 60 * 1000
      ).toISOString()}`,
      replies: []
    }
  ])

  return (
    <div style={{ width: '100%' }}>
      <a
        style={{ color: 'black', cursor: 'pointer' }}
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/AdvancedComponent.tsx'
      >
        <span className='title'>Advanced Input Component</span>
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
        hrStyle={{ border: '0.5px solid #ff0072' }}
        commentData={data}
        currentData={(data: any) => {
          console.log('current data', data)
        }}
        logIn={{
          onLogin: () => alert('Call login function '),
          signUpLink: 'http://localhost:3001/'
        }}
        customImg='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60'
        inputStyle={{ border: '1px solid rgb(208 208 208)' }}
        formStyle={{ backgroundColor: 'white' }}
        submitBtnStyle={{
          border: '1px solid black',
          backgroundColor: 'black',
          padding: '7px 15px'
        }}
        cancelBtnStyle={{
          border: '1px solid gray',
          backgroundColor: 'gray',
          color: 'white',
          padding: '7px 15px'
        }}
        advancedInput={true}
        replyInputStyle={{ borderBottom: '1px solid black', color: 'black' }}
        messagePlaceholder='Leave a comment.'
        replyPlaceholder='Leave a nice reply here, please.'
      />
    </div>
  )
}

export default AdvancedComponent
