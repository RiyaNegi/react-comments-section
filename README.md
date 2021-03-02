# react-comments-section

`react-comments-section` is a simple but multi-functional react comment section component that helps you create comments section similar to youtube or instagram for your React App.
`react-comments-section` is very useful for react beginners who want a comment section in their project but want to skip it's commplexity. This library will give a fully functional comment section with the following features: 
  - User can reply to comments  
  - User can edit his/her comments
  - User can delete his/her comments

live demo of the library -> https://riyanegi.github.io/react-comments-section/

[![NPM](https://img.shields.io/npm/v/react-comments.svg)](https://www.npmjs.com/package/react-comments) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![commentbox](https://github.com/RiyaNegi/react-comments-section/blob/main/example/userlogin.png)

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
   const signinUrl = "/signin"
   const signupUrl = "/signup"
   let count = 0
   comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

   return <div className="commentSection">
 <div className="header">{count} Comments</div>

 <CommentSection currentUser={userId && { userId: userId, avatarUrl: avatarUrl, name: name }} commentsArray={comment}
 setComment={setComment} signinUrl={signinUrl} signupUrl={signupUrl}/>
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
    const signinUrl = "/signin"
    const signupUrl = "/signup"
    let count = 0
   this.state.comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

    return <div className="commentSection">
     <div className="header">{count} Comments</div>
    
     <CommentSection currentUser={userId && { userId: userId, avatarUrl: avatarUrl, name:name }} commentsArray={this.state.comment}
     setComment={this.handleState} signinUrl={signinUrl} signupUrl={signupUrl} />
         </div>
}
}

export default App

```
### Display comments on the basis of user authentication
If the prop currentUser is undefined, the comment section refers to the signinUrl or signupUrl props to redirect the user to the given URLs

![commentbox](https://github.com/RiyaNegi/react-comments-section/blob/main/example/usernotlog.png)




# Component API
All the props that you will require for using this library

## currentUser
This prop is required to give currently logged in user's details.

 > object | require
```jsx
currentUser={{ userId: userId, avatarUrl: avatarUrl, name:name}}
```

## commentsArray
This prop is required to give an array of comments in this format strictly.


 > JSON Array | require
```jsx
[
  {
    "userId": "01a",
    "comId": "012",
    "fullName": "Riya Negi",
    "avatarUrl": "https://ui-avatars.com/api/name=Riya&background=random" ,
    "text": "Hey, Loved your blog! ",
    "replies": [
      {
        "userId": "02a",
        "comId": "013",
  
        "fullName": "Adam Scott",
        "avatarUrl": "https://ui-avatars.com/api/name=Adam&background=random" ,
        "text": "Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰"
      },
      {
        "userId": "01a",
        "comId": "014",
  
        "fullName": "Riya Negi",
        "avatarUrl": "https://ui-avatars.com/api/name=Riya&background=random",
        "text": "thanks!😊"
      }
    ]
  },
  {
    "userId": "02b",
    "comId": "017",
    "fullName": "Lily",
    "text": "I have a doubt about the 4th point🤔",
    "avatarUrl": "https://ui-avatars.com/api/name=Lily&background=random"
  },
  {
    "userId": "01c",
    "comId": "018",
    "fullName": "Derek",
    "text": "Great explanation!!!",
    "avatarUrl": "https://ui-avatars.com/api/name=Derek&background=random"
  }
]
```
## setComment
This prop is required to give a set-state function to keep the parent component's state updated.


 > func | require
```jsx
setComment={this.handleState}

```
## signinUrl
This prop is given in addition to the currentUser prop, so  that if no user is logged in, It can redirect it to the login link.


 > string | optional
```jsx
signinUrl="/signin"

```
## signupUrl
This prop is given in addition to the currentUser prop, so  that if no user is logged in, It can redirect it to the signup/registeration link.


 > string | optional
```jsx
signupUrl="/signup"

```




## License

MIT © [RiyaNegi](https://github.com/RiyaNegi)
