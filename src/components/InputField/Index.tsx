import "./InputField.scss";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/Provider";

interface InputFieldProps {
  styleProps?: object;
  comId?: string;
  fillerText?: string;
  parentId?: string;
  mode?: string;
}

const InputField = ({
  styleProps,
  comId,
  fillerText,
  parentId,
  mode,
}: InputFieldProps) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (fillerText) {
      setText(fillerText);
    }
  }, [fillerText]);

  const globalStore: any = useContext(GlobalContext);

  return (
    <form className="form" style={styleProps}>
      <div className="userImg">
        <a
          target="_blank"
          href={globalStore.currentUserData.currentUserProfile}
        >
          <img
            src={globalStore.currentUserData.currentUserImg}
            style={{ width: 38, height: 38, borderRadius: 38 / 2 }}
            alt="userIcon"
          />
        </a>
      </div>
      <input
        className="postComment"
        type="text"
        placeholder="Type your reply here."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {mode && (
        <button
          className="cancelBtn"
          type="button"
          onClick={() =>
            mode === "editMode"
              ? globalStore.handleAction(comId, true)
              : globalStore.handleAction(comId, false)
          }
        >
          Cancel
        </button>
      )}
      <button
        className="postBtn"
        type="button"
        onClick={async () => {
          mode === "editMode"
            ? await globalStore.onEdit(text, comId, parentId)
            : mode === "replyMode"
            ? await globalStore.onReply(text, comId, parentId)
            : await globalStore.onSubmit(text);
          setText("");
        }}
      >
        Post
      </button>
    </form>
  );
};
export default InputField;
