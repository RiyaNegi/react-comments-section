import React, { PureComponent, useState } from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'
import "./App.css"
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
        setComment={setComment} signinUrl={signinUrl} signupUrl={signupUrl} />
    </div>
    <div class="verticalLine">
    </div>
    {/* <div className="commentSection">
    <div className="header">{count} Comments (user not logged in)</div>
    <CommentSection commentsArray={comment}
      setComment={setComment} signinUrl={signinUrl} signupUrl={signupUrl} />
  </div> */}
  </div>
}

// class App extends PureComponent{
//   state={ 
//     comment : data
//   }

//   handleState=(value)=>{
//     this.setState({comment:value})
//   }

//   render() {
//     const userId = "01a"
//     const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
//     const name = "xyz"
//     let count = 0
//    this.state.comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

//     return <div className="commentSection">
//      <div className="header">{count} Comments</div>

//      <CommentSection currentUser={{ userId: userId, avatarUrl: avatarUrl, name:name }} commentsArray={this.state.comment}
//      setComment={this.handleState} />
//          </div>
// }
// }

export default App
