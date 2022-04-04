import React, { useContext } from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'

const SignField = () => {
  const actions = useContext(ActionContext)

  const handleDivClick = (e) => {
    if (e.target.name === 'login') {
      window.location.href = actions.signinUrl
    } else if (e.target.name === 'signup') {
      window.location.href = actions.signupUrl
    }
  }

  return (
    <div className={styles.signBox}>
      <div className={styles.signLine}>
        {actions.i18n.sign.boxLine}
      </div>
      <div>
        <button
          className={styles.loginBtn}
          name='login'
          onClick={(e) => handleDivClick(e)}
        >
          {actions.i18n.sign.logIn}
        </button>
        <button
          className={styles.signBtn}
          name='signup'
          onClick={(e) => handleDivClick(e)}
        >
          {actions.i18n.sign.signUp}
        </button>
      </div>
    </div>
  )
}

export default SignField
