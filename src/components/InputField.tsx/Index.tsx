import "./InputField.scss";
import { inputFrame } from "./InputFieldStyles";

interface InputFieldProps {
  bkgColor?: string | undefined;
  txtColor?: string | undefined;
}

const InputField = ({ bkgColor, txtColor }: InputFieldProps) => {
  return (
    <form
      className="form"
      style={{ backgroundColor: bkgColor, color: txtColor }}
    >
      <div className="userImg">image</div>
      <input
        className="postComment"
        type="text"
        placeholder="Type your reply here."
      />
      <div>
        <button type="button">Post</button>
      </div>
    </form>
  );
};
export default InputField;
