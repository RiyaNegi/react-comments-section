import React from 'react'
import './LoginSection.scss'

interface LoginSectionProps {
  loginLink: string
  signUpLink: string
}

const LoginSection = ({ loginLink, signUpLink }: LoginSectionProps) => {
  return (
    <div className='signBox'>
      <div className='signLine'>Log in or sign up to leave a comment</div>
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
