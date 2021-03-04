import React, { useContext } from 'react'
import InputField from './InputField'
import { ActionContext } from './ActionContext'

const Input = () => {
  const action = useContext(ActionContext)
  console.log('func->', action.handleCancel)
  return action.customInput ? (
    action.customInput({
      authorImg: action.userImg,
      main: true,
      onSubmit: action.onSubmit,
      handleCancel: action.handleCancel
    })
  ) : (
    <InputField authorImg={action.userImg} main />
  )
}

export default Input
