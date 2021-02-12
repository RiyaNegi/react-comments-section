import React, { useState } from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'

const App = () => {
  const [comment, setComment] = useState(data)
  console.log('submit:', comment);

  return <CommentSection currentUser={{ userId: "01a", avatarUrl: "https://avatars.dicebear.com/4.5/api/bottts/Riya_GeS43.svg" }} commentsArray={comment}
    onSubmit={text => {
      if (text.length > 0) {
        setComment([...comment,
        {
          userId: '02v',
          comId: "123",
          avatarUrl: 'https://avatars.dicebear.com/4.5/api/bottts/Tanvi_Ai90.svg',
          fullName: 'new',
          text: text
        }]
        );
        console.log('submit:', text);
      }
    }} />
}

export default App
