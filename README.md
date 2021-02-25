# react-comments-section

`react-comments-section` is a simple but multi-functional react comment section component that helps you create comments section similar to youtube or instagram for your React App.
`react-comments-section` is very useful for react beginners who want a comment section in their project but want to skip it's commplexity. This library will give a fully functional comment section with the following features: 
  - User can reply to comments  
  - User can edit his/her comments
  - User can delete his/her comments

live demo of the library -> https://riyanegi.github.io/react-comments-section/

[![NPM](https://img.shields.io/npm/v/react-comments.svg)](https://www.npmjs.com/package/react-comments) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i react-comments-section
```

## Usage

### Hooks Implementation

```jsx
import React, { PureComponent, useState } from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'
import "./App.css"


 const App = () => {
   const [comment, setComment] = useState(data)
   const userId = "01a"
   const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
   const name = "xyz"
   let count = 0
   comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

   return <div className="commentSection">
 <div className="header">{count} Comments</div>

 <CommentSection currentUser={{ userId: userId, avatarUrl: avatarUrl, name:name }} commentsArray={comment}
 setComment={setComment} />
     </div>
 }
 
 export default App

```

### Class Implementation

```jsx
import React, { PureComponent, useState } from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'
import "./App.css"

class App extends PureComponent{
  state={ 
    comment : data
  }

  handleState=(value)=>{
    this.setState({comment:value})
  }

  render() {
    const userId = "01a"
    const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
    const name = "xyz"
    let count = 0
   this.state.comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

    return <div className="commentSection">
     <div className="header">{count} Comments</div>
    
     <CommentSection currentUser={{ userId: userId, avatarUrl: avatarUrl, name:name }} commentsArray={this.state.comment}
     setComment={this.handleState} />
         </div>
}
}

export default App

```




# Component API
All the props that you will require for using this library

## currentUser

 > object | require
```jsx
currentUser={{ userId: userId, avatarUrl: avatarUrl }}
```

## commentsArray

 > JSON Array | require
```jsx
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
## setComment

 > func | require
```jsx
setComment={this.handleState}

```




## License

MIT © [RiyaNegi](https://github.com/RiyaNegi)
