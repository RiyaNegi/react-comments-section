import React from "react";
import ReactDOM from "react-dom/client";
import CommentSection from "./components/CommentSection/Index";
import GlobalProvider from "./context/Provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider
      currentUser={{
        currentUserId: "01a",
        currentUserImg:
          "https://ui-avatars.com/api/name=Riya&background=random",
        currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
        currentUserFullName: "Riya Negi",
      }}
    >
      <CommentSection />
    </GlobalProvider>
  </React.StrictMode>
);
