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
        Log in or sign up to leave a comment
      </div>
      <div>
        <button
          className={styles.loginBtn}
          name='login'
          onClick={(e) => handleDivClick(e)}
        >
          Log In
        </button>
        <button
          className={styles.signBtn}
          name='signup'
          onClick={(e) => handleDivClick(e)}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default SignField
