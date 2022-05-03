import CommentStructure from "../CommentStructure.tsx/Index";
import InputField from "../InputField/Index";
import "./CommentSection.scss";
import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import _ from "lodash";

const CommentSection = () => {
  const globalStore: any = useContext(GlobalContext);
  console.log("Checl reply arry", globalStore.replyArr);

  return (
    <div className="overlay">
      Comments section!
      <InputField />
      {globalStore.data.map(
        (i: {
          userId: string;
          comId: string;
          fullName: string;
          avatarUrl: string;
          text: string;
          userProfile?: string;
          replies: Array<any> | undefined;
        }) => {
          return (
            <div key={i.comId}>
              <CommentStructure
                info={i}
                editMode={
                  _.indexOf(globalStore.editArr, i.comId) === -1 ? false : true
                }
                replyMode={
                  _.indexOf(globalStore.replyArr, i.comId) === -1 ? false : true
                }
              />
              {i.replies &&
                i.replies.length > 0 &&
                i.replies.map((j) => {
                  return (
                    <div className="replySection" key={j.comId}>
                      <CommentStructure
                        info={j}
                        parentId={i.comId}
                        editMode={
                          _.indexOf(globalStore.editArr, j.comId) === -1
                            ? false
                            : true
                        }
                        replyMode={
                          _.indexOf(globalStore.replyArr, j.comId) === -1
                            ? false
                            : true
                        }
                      />
                    </div>
                  );
                })}
            </div>
          );
        }
      )}
    </div>
  );
};

export default CommentSection;
