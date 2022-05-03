import "./CommentStructure.scss";
import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import Popup from "reactjs-popup";
import replyIcon from "../../media/reply.svg";
import optionIcon from "../../media/options.svg";
import InputField from "../InputField/Index";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import DeleteModal from "./DeleteModal";

interface CommentStructureProps {
  info: {
    userId: string;
    comId: string;
    fullName: string;
    avatarUrl: string;
    text: string;
    userProfile?: string;
    replies?: Array<object> | undefined;
  };
  editMode: boolean;
  parentId?: string;
  replyMode: boolean;
}

const CommentStructure = ({
  info,
  editMode,
  parentId,
  replyMode,
}: CommentStructureProps) => {
  const globalStore: any = useContext(GlobalContext);
  const currentUser = globalStore.currentUserData;

  const optionsMenu = () => {
    return (
      <div className="userActions">
        {info.userId === currentUser.currentUserId && (
          <Menu
            menuButton={
              <button className="actionsBtn">
                {" "}
                <img src={optionIcon} className="optionIcon" />
              </button>
            }
          >
            <MenuItem
              onClick={() => globalStore.handleAction(info.comId, true)}
            >
              edit
            </MenuItem>
            <MenuItem>
              <DeleteModal comId={info.comId} parentId={parentId} />
            </MenuItem>
          </Menu>
        )}
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="commentsTwo">
        <a className="userLink" target="_blank" href={info.userProfile}>
          <div>
            <img
              src={info.avatarUrl}
              style={{ width: 28, height: 28, borderRadius: 28 / 2 }}
              alt="userIcon"
            />
          </div>
          <div className="fullName">{info.fullName} </div>
        </a>
        <div>
          <button
            className="replyBtn"
            onClick={() => globalStore.handleAction(info.comId, false)}
          >
            <img src={replyIcon} className="replyIcon" />
            Reply
          </button>
        </div>
      </div>
    );
  };

  const replyTopSection = () => {
    return (
      <div className="halfDiv">
        <div className="userInfo">
          <div>{info.text}</div>
          {userInfo()}
        </div>
        {optionsMenu()}
      </div>
    );
  };

  const replyBottomSection = () => {
    return (
      <div className="halfDiv">
        <div className="userInfo">
          {userInfo()}
          <div className="infoStyle">{info.text}</div>
        </div>
        {optionsMenu()}
      </div>
    );
  };

  const actionModeSection = (mode: string) => {
    if (mode === "reply") {
      return (
        <div className="replysection">
          {globalStore.replyTop ? replyTopSection() : replyBottomSection()}
          <InputField
            styleProps={{
              backgroundColor: "transparent",
              padding: "20px 0px",
              marginLeft: "-15px",
            }}
            comId={info.comId}
            fillerText={""}
            mode={"replyMode"}
            parentId={parentId}
          />
        </div>
      );
    } else {
      return (
        <InputField
          styleProps={{
            backgroundColor: "transparent",
            padding: "20px 0px",
            marginLeft: "-15px",
          }}
          comId={info.comId}
          fillerText={info.text}
          mode={"editMode"}
          parentId={parentId}
        />
      );
    }
  };

  return (
    <div>
      {editMode
        ? actionModeSection("edit")
        : replyMode
        ? actionModeSection("reply")
        : globalStore.replyTop
        ? replyTopSection()
        : replyBottomSection()}
    </div>
  );
};

export default CommentStructure;
