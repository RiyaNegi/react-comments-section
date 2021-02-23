# react-comments

`react-comments` is a simple React comment section component that help you create comments section, similar to youtube or instagram coomments section for your React App.
`react-comments` is very useful for react beginners who want a comment section in their project. This library will give a fully functional comment section with the following features: 
  - User can reply to comments  
  - User can edit his/her comments
  - User can delete his/her comments

[![NPM](https://img.shields.io/npm/v/react-comments.svg)](https://www.npmjs.com/package/react-comments) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-comments
```

## Usage

```jsx
import React, { useState } from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'
import uuid from 'react-uuid'

const App = () => {
  const [comment, setComment] = useState(data)
  const userId = "01a"
  const avatarUrl = "https://avatars.dicebear.com/4.5/api/bottts/Riya_GeS43.svg"
  const name = "xyz"

  return <CommentSection currentUser={{ userId: userId, avatarUrl: avatarUrl }} commentsArray={comment}
    onSubmit={(text, parentId, child) => {
      if (text.length > 0) {
        if (!parentId && !child) {
          setComment([...comment,
          {
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
            text: text
          }]
          );
          return
        }
        else if (parentId && child) {
          const newList = [...comment]
          let index = newList.findIndex(x => x.comId === parentId)
          newList[index].replies.push({
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
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
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
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
    } deleteText={(id, parentId) => {
      if (parentId === undefined) {
        let newList = [...comment]
        let filter = newList.filter(x => x.comId !== id)
        setComment(filter)
      }
      else if (parentId !== undefined) {
        let newList = [...comment]
        let index = newList.findIndex(x => x.comId === parentId)
        let filter = newList[index].replies.filter(x => x.comId !== id)
        newList[index].replies = filter
        setComment(newList)
      }
    }
    } />
}
```

# Component API
All the props that you will require for using this library

## currentUser

 > object | require
```
currentUser={{ userId: userId, avatarUrl: avatarUrl }}
```

## commentsArray

 > JSON Array | require
```
[
  {
    "userId": "01a",
    "comId": "012",
    "avatarUrl": "https://avatars.dicebear.com/4.5/api/bottts/Riya_GeS43.svg",
    "fullName": "Riya Negi",
    "text": "Hello there",
    "replies": [
      {
        "userId": "02a",
        "comId": "013",
        "avatarUrl": "https://avatars.dicebear.com/4.5/api/bottts/Tanvi_Ai90.svg",
        "fullName": "tanvi N",
        "text": "great project"
      },
      {
        "userId": "01a",
        "comId": "014",
        "avatarUrl": "https://avatars.dicebear.com/4.5/api/bottts/Riya_GeS43.svg",
        "fullName": "Riya Negi",
        "text": "thanks!"
      }
    ]
  },
  {
    "userId": "01c",
    "comId": "018",
    "avatarUrl": "https://avatars.dicebear.com/4.5/api/bottts/Ankit_hbM0.svg",
    "fullName": "Beyonce",
    "text": "Ek number project!!!"
  }
]
```

### onSubmit

 > func | require
```
onSubmit={(text, parentId, child) => {
      if (text.length > 0) {
        if (!parentId && !child) {
          setComment([...comment,
          {
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
            text: text
          }]
          );
          return
        }
        else if (parentId && child) {
          const newList = [...comment]
          let index = newList.findIndex(x => x.comId === parentId)
          newList[index].replies.push({
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
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
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
            text: text
          })
          newList[index].replies = newReplies
          setComment(newList)
          return
        }
      }
    }} 
```

## editText

 > func | require
```
editText={(id, text, parentId) => {
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
    }
```

## deleteText

 > func | require
```
deleteText={(id, parentId) => {
      if (parentId === undefined) {
        let newList = [...comment]
        let filter = newList.filter(x => x.comId !== id)
        setComment(filter)
      }
      else if (parentId !== undefined) {
        let newList = [...comment]
        let index = newList.findIndex(x => x.comId === parentId)
        let filter = newList[index].replies.filter(x => x.comId !== id)
        newList[index].replies = filter
        setComment(newList)
      }
    }
    } 
```


## License

MIT © [RiyaNegi](https://github.com/RiyaNegi)
