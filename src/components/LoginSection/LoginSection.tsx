import React from 'react'
import './LoginSection.scss'

interface LoginSectionProps {
  loginLink: string
  signUpLink: string
  messagePlaceholder?: string
}

const LoginSection = ({ loginLink, signUpLink, messagePlaceholder = 'Log in or sign up to leave a comment'}: LoginSectionProps) => {
  return (
    <div className='signBox'>
      <div className='signLine'>{messagePlaceholder}</div>
      <div>
        <a href={loginLink}>
          <button className='loginBtn' name='login'>
            Log In
          </button>
        </a>
        <a href={signUpLink}>
          <button className='signBtn' name='signup'>
            Sign Up
          </button>
        </a>
      </div>
    </div>
  )
}

export default LoginSection
