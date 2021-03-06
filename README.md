# react-comments-section
![NPM](https://img.shields.io/npm/v/react-comments-section.svg)


`react-comments-section` is a simple but multi-functional react comment section component that helps you create comments section similar to youtube or instagram for your React App.
`react-comments-section` is very useful for react beginners who want a comment section in their project but want to skip it's commplexity. This library will give a fully functional comment section with the following features: 
  - User can reply to comments  
  - User can edit his/her comments
  - User can delete his/her comments

live demo of the library -> https://riyanegi.github.io/react-comments-section/

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

## customInput
This is an optional prop to give users the flexibility of adding their own custom input field.

 > func | optional
```jsx
const customInputFunc = (props) => {
    return <CustomInput parentId={props.parentId}
      cancellor={props.cancellor}
      value={props.value}  edit={props.edit}
      submit={props.submit} handleCancel={props.handleCancel}/>
  }
```
You can then pass this function to the `customInput` prop
```jsx
customInput={customInputFunc}
```

# Custom Input Field
With the customInput prop, users ccan create their own custom stylized input field.
## Usage
You can create your custom input field by follwing this template.
- The `<input>` tag needs 2 required props.
    - ` value = {text} ` to store the comments and to populate the form while editing a comment.
    - `onChange={handleChange}` to handle the changing inputs. The handleChange function should setState of the text. 
    For example (ideal case) ->
       ` const handleChange = (e) => {
        setText(e.target.value)
      }`

- The "Post/Submit" `<button>` tag requires 1 props
    - `onClick={() =>submit(cancellor, text, parentId, edit, setText)}`
    This prop can be used as `onSubmit` by any submitting action.

- The "Cancel" `<button>` tag requires 1 props
    - `onClick={() => handleCancel(cancellor,edit)}`
    This prop can be used by any cancelling action.

Using this template, users can add different styling elements and design their custom GUI for the input field.

```jsx
import React, {useState} from "react"

const CustomInput=({cancellor,
  parentId,
  value,
  edit,
  submit,
  handleCancel,
  })=>{
    const [text, setText] = useState(value)

    const handleChange = (e) => {
        setText(e.target.value)
      }
    return(  <form>
        <input
          value={text}
          onChange={handleChange}
        />
        <div >
          <button
            onClick={() =>submit(cancellor, text, parentId, edit, setText)}
            type='button'
            disabled={!text}
          >
            Post
          </button>
            <button onClick={() => handleCancel(cancellor,edit)}>
              Cancel
            </button>
        </div>
      </form>)
}

export default CustomInput
```

## How to pass the custom input component to the library 

```jsx
import CustomInput from "./CustomInput"
const App = () => {
  const [comment, setComment] = useState(data)
  const userId = "01a"
  const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
  const name = "xyz"
  const signinUrl = "/signin"
  const signupUrl = "/signup"
  let count = 0
  comment.map(i => { count += 1; i.replies && i.replies.map(i => count += 1) })
  
  const customInputFunc = (props) => {
    return <CustomInput parentId={props.parentId}
      cancellor={props.cancellor}
      value={props.value}  edit={props.edit}
      submit={props.submit} handleCancel={props.handleCancel}/>
  }

  return <div className="cols">
    <div className="commentSection">
      <div className="header">{count} Comments (user logged in)</div>
      <CommentSection currentUser={userId && { userId: userId, avatarUrl: avatarUrl, name: name }} commentsArray={comment} 
      setComment={setComment} signinUrl={signinUrl} signupUrl={signupUrl} customInput={customInputFunc}/>
    </div>
  </div>
}

export default App

```

## Custom Input Example
![customInput](https://github.com/RiyaNegi/react-comments-section/blob/main/example/customInput.png)

### JSX code

```jsx
import React, {useState} from "react"
import user from "./user.png"
import "./custom.css"

const CustomInput=({cancellor,
  parentId,
  value,
  edit,
  submit,
  handleCancel,
  })=>{
    const [text, setText] = useState(value)

    const handleChange = (e) => {
        setText(e.target.value)
      }
    return(
        <form>
            <div className="form">
            <div className="row"> <img src={user} style={{width:80, height:80}}/>
            <div className="row">
                <div className="arrow-left"></div>
                <div className="input-div"> 
                <span className="input-name">Riya Negi</span>
                <textarea
                    rows="2"
                    className="input-box"
                    type='text'
                    placeholder='Type your reply here.'
                    component='input'
                    value={text}
                    onChange={handleChange}></textarea>  
            </div>
            </div> 
            </div>
        <div className="btn-div">
          <button
          className="post-btn"
            onClick={() =>submit(cancellor, text, parentId, edit, setText)}
            type="submit" 
            disabled={!text}
          >
            Post
          </button>
            <button className="cancel-btn"
            onClick={() => handleCancel(cancellor,edit)}>
              Cancel
            </button>
        </div>
        </div>
      </form>
    )
}

export default CustomInput

```

### CSS Styling

```css
.row{
    display: flex;
    width:100%;
}
.form{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}
.input-box{
  background: #d4e7ff;
  border: none;
  border-radius: 3px;
  margin-top: 5px;
  color:rgb(49, 49, 49);
}
.input-box:focus{
    outline: none;
}
.input-div{
    background: #d4e7ff;
    width: 100%;
    padding:10px;
    display: flex;
    flex-direction: column;
}
.input-name{
    color:rgb(49, 49, 49);
}
.arrow-left {
    width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent; 
    border-right:10px solid #d4e7ff;
    margin-top:20px;
}
.btn-div{
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
    }

.post-btn{
    border : 2px solid #659bdb;
    border-radius: 5px;
    background-color: #659bdb;
    padding: 5px 14px;
    color: #ffffff;
    font-weight:bolder;
    margin-right: 10px;
    font-size: 16px;
    cursor: pointer;
}
.post-btn:active{
    outline: none;
}
.cancel-btn{
    color: rgb(139, 139, 139);
    text-align: center;
    background-size: 200% auto;
    border-radius:5px;
    padding: 5px 10px;
    border: 2px solid rgb(139, 139, 139);
    font-weight:bolder;
    font-size: 16px;
    cursor: pointer;
}
.cancel-btn:focus {
    outline:0;
  }
```




## License

MIT © [RiyaNegi](https://github.com/RiyaNegi)
