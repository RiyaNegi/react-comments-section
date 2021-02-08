import React from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'

const App = () => {
  return <CommentSection currentUser="01a" commentsArray={data} authorImg="https://avatars.dicebear.com/4.5/api/bottts/Riya_GeS43.svg" />
}

export default App
