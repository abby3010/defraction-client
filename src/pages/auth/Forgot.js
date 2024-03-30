import React from 'react'
import { Link } from 'react-router-dom'

export default function Forgot() {
  return (
    <div className="vh-100 d-flex justify-content-center">
    <div className="form-access my-auto">
      <form>
        <span>Reset Password</span>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email Address"/>
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      <h2>Remembered your password? <Link to="/">Sign in here</Link></h2>
    </div>
  </div>
  )
}
