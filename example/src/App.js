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
