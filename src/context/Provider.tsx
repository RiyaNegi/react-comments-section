import React, { createContext, useEffect, useState } from "react";
import mockData from "../components/data.json";
import _ from "lodash";
import { v4 as uuid } from "uuid";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children, currentUser, replyTop }: any) => {
  const [currentUserData, setCurrentUserData] = useState(currentUser);
  const [data, setData] = useState<object[]>(mockData);
  const [editArr, setEdit] = useState<string[]>([]);
  const [replyArr, setReply] = useState<string[]>([]);

  const handleAction = (id: string, edit: boolean) => {
    if (edit) {
      let editArrCopy: string[] = [...editArr];
      let indexOfId = _.indexOf(editArrCopy, id);
      if (_.includes(editArr, id)) {
        editArrCopy.splice(indexOfId, 1);
        setEdit(editArrCopy);
      } else {
        editArrCopy.push(id);
        setEdit(editArrCopy);
      }
    } else {
      let replyArrCopy: string[] = [...replyArr];
      let indexOfId = _.indexOf(replyArrCopy, id);
      if (_.includes(replyArr, id)) {
        replyArrCopy.splice(indexOfId, 1);
        setReply(replyArrCopy);
      } else {
        replyArrCopy.push(id);
        setReply(replyArrCopy);
      }
    }
  };

  const onSubmit = (text: string) => {
    let copyData = [...mockData];
    copyData.push({
      userId: currentUserData.currentUserId,
      comId: uuid(),
      avatarUrl: currentUserData.currentUserImg,
      userProfile: currentUserData.currentUserProfile
        ? currentUserData.currentUserProfile
        : null,
      fullName: currentUserData.currentUserFullName,
      text: text,
      replies: [],
    });
    setData(copyData);
  };

  const onEdit = (text: string, comId: string, parentId: string) => {
    let copyData = [...mockData];
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId });
      const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
        comId: comId,
      });
      copyData[indexOfParent].replies![indexOfId].text = text;
      setData(copyData);
      handleAction(comId, true);
    } else {
      const indexOfId = _.findIndex(copyData, { comId: comId });
      copyData[indexOfId].text = text;
      setData(copyData);
      handleAction(comId, true);
    }
  };

  const onReply = (text: string, comId: string, parentId: string) => {
    let copyData = [...mockData];
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId });
      copyData[indexOfParent].replies!.push({
        userId: currentUserData.currentUserId,
        comId: uuid(),
        avatarUrl: currentUserData.currentUserImg,
        userProfile: currentUserData.currentUserProfile
          ? currentUserData.currentUserProfile
          : null,
        fullName: currentUserData.currentUserFullName,
        text: text,
      });
      setData(copyData);
      handleAction(comId, false);
    } else {
      const indexOfId = _.findIndex(copyData, {
        comId: comId,
      });
      copyData[indexOfId].replies!.push({
        userId: currentUserData.currentUserId,
        comId: uuid(),
        avatarUrl: currentUserData.currentUserImg,
        userProfile: currentUserData.currentUserProfile
          ? currentUserData.currentUserProfile
          : null,
        fullName: currentUserData.currentUserFullName,
        text: text,
      });
      setData(copyData);
      handleAction(comId, false);
    }
  };

  const onDelete = (comId: string, parentId: string) => {
    let copyData = [...mockData];
    if (parentId) {
      const indexOfParent = _.findIndex(copyData, { comId: parentId });
      const indexOfId = _.findIndex(copyData[indexOfParent].replies, {
        comId: comId,
      });
      copyData[indexOfParent].replies.splice(indexOfId, 1);
      setData(copyData);
    } else {
      const indexOfId = _.findIndex(copyData, { comId: comId });
      copyData.splice(indexOfId, 1);
      setData(copyData);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        currentUserData: currentUserData,
        replyTop: replyTop,
        data: data,
        handleAction: handleAction,
        editArr: editArr,
        onSubmit: onSubmit,
        onEdit: onEdit,
        replyArr: replyArr,
        onReply: onReply,
        onDelete: onDelete,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
