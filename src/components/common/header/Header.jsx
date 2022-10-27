import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/attemptList'>Tutor (Attempt Review)</Link>
            </li>
            <li>
              <Link to='/makequiz'>Tutor (Make Quize)</Link>
            </li>
            <li>
              <Link to='/quiz'>Quiz</Link>
            </li>
            <li>
              <Link to='/studentLastAttempts?std=S001'>Student (Past Attempts)</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button'>GET CERTIFICATE</div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
