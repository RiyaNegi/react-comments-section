import React from 'react'
import './LoginSection.scss'

interface LoginSectionProps {
  loginLink?: string | (() => void)
  signUpLink?: string | (() => void)
  onLogin?: string | (() => void)
  onSignUp?: string | (() => void)
}

const LoginSection = ({
  loginLink,
  signUpLink,
  onLogin,
  onSignUp
}: LoginSectionProps) => {
  const handleLoginClick = () => {
    const loginAction = onLogin || loginLink
    if (typeof loginAction === 'function') {
      loginAction()
    } else if (loginAction) {
      window.location.href = loginAction
    }
  }

  const handleSignUpClick = () => {
    const signUpAction = onSignUp || signUpLink
    if (typeof signUpAction === 'function') {
      signUpAction()
    } else if (signUpAction) {
      window.location.href = signUpAction
    }
  }

  return (
    <div className='signBox'>
      <div className='signLine'>Log in or sign up to leave a comment</div>
      <div>
        <button className='loginBtn' name='login' onClick={handleLoginClick}>
          Log In
        </button>
        <button className='signBtn' name='signup' onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default LoginSection
