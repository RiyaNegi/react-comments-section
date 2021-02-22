import React, { useState } from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'
import uuid from 'react-uuid'


const App = () => {
  const [comment, setComment] = useState(data)

  return <CommentSection currentUser={{ userId: "01a", avatarUrl: "https://avatars.dicebear.com/4.5/api/bottts/Riya_GeS43.svg" }} commentsArray={comment}
    onSubmit={(text, parentId, child) => {
      if (text.length > 0) {
        if (!parentId && !child) {
          setComment([...comment,
          {
            userId: "01a",
            comId: uuid(),
            avatarUrl: 'https://avatars.dicebear.com/4.5/api/bottts/Tanvi_Ai90.svg',
            fullName: 'new',
            text: text
          }]
          );
          return
        }
        else if (parentId && child) {
          const newList = [...comment]
          let index = newList.findIndex(x => x.comId === parentId)
          newList[index].replies.push({
            userId: "01a",
            comId: uuid(),
            avatarUrl: 'https://avatars.dicebear.com/4.5/api/bottts/Tanvi_Ai90.svg',
            fullName: 'new',
            text: text
          })
          setComment(newList)
          return
        }
        else if (parentId && !child) {
          let newList = [...comment]
          let index = newList.findIndex(x => x.comId === parentId)
          let newReplies = newList[index].replies === undefined ? [] : [...newList[index].replies]
          newReplies.push({
            userId: "01a",
            comId: uuid(),
            avatarUrl: 'https://avatars.dicebear.com/4.5/api/bottts/Tanvi_Ai90.svg',
            fullName: 'new',
            text: text
          })
          newList[index].replies = newReplies
          setComment(newList)
          return
        }
      }
    }} editText={(id, text, parentId) => {
      if (parentId === undefined) {
        let newList = [...comment]
        let index = newList.findIndex(x => x.comId === id)
        newList[index].text = text
        setComment(newList)
      }
      else if (parentId !== undefined) {
        let newList = [...comment]
        let index = newList.findIndex(x => x.comId === parentId)
        let replyIndex = newList[index].replies.findIndex(i => i.comId === id)
        newList[index].replies[replyIndex].text = text
        setComment(newList)
      }
    }
    } />
}

export default App
