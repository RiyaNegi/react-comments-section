import React from "react";
import ReactDOM from "react-dom/client";
import CommentStructure from "./components/CommentStructure.tsx/Index";
import InputField from "./components/InputField.tsx/Index";
import GlobalProvider from "./context/Provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <InputField />
    </GlobalProvider>
  </React.StrictMode>
);

// import React, { useEffect, useState } from "react";
// import InputField from "./components/InputField.tsx/Index";
// import GlobalProvider from "./context/Provider";

// export const CommentSection = ({}) => {
//   const [comments, setComments] = useState([]);
//   // useEffect(() => {
//   //   setComments(commentsArray)
//   // }, [commentsArray])

//   return (
//     <GlobalProvider
//       // currentUser={currentUser}
//       // setComment={setComment}
//       comments={comments}
//       // signinUrl={signinUrl}
//       // signupUrl={signupUrl}
//       // customInput={customInput}
//     >
//       <div>
//         <InputField />
//       </div>
//     </GlobalProvider>
//   );
// };
