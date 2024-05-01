import React from 'react'
import login from './assets/img/login-bg.png'
import './assets/css/styles.css'
import './assets/scss/base/_base.css'
import './assets/scss/base/_base.min.css'
// import './assets/scss/components/_breakpoints.css'
import './assets/scss/components/_login.css'
// import './assets/scss/components/dist/_breakpoints.min.css'
import './assets/scss/components/dist/_login.min.css'
// import './assets/scss/config/_variables.css'
import './assets/scss/styles.css'
// import './assets/js/main'

export default function index() {
   return (
      <div>
         <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/*=============== REMIXICONS ===============*/}
            <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
            {/*=============== CSS ===============*/}
            <link rel="stylesheet" href="assets/css/styles.css" />
            <title>Animated login form - Bedimcode</title>
            <div className="login">
               {/* <img src='{}' alt="login image" className="login__img" /> */}
               <img src={login} />
               <form action className="login__form">
                  <h1 className="login__title">Login</h1>
                  <div className="login__content">
                     <div className="login__box">
                        <i className="ri-user-3-line login__icon" />
                        <div className="login__box-input">
                           <input type="email" required className="login__input" id="login-email" placeholder=" " />
                           <label htmlFor="login-email" className="login__label">Email</label>
                        </div>
                     </div>
                     <div className="login__box">
                        <i className="ri-lock-2-line login__icon" />
                        <div className="login__box-input">
                           <input type="password" required className="login__input" id="login-pass" placeholder=" " />
                           <label htmlFor="login-pass" className="login__label">Password</label>
                           <i className="ri-eye-off-line login__eye" id="login-eye" />
                        </div>
                     </div>
                  </div>
                  <div className="login__check">
                     <div className="login__check-group">
                        <input type="checkbox" className="login__check-input" id="login-check" />
                        <label htmlFor="login-check" className="login__check-label">Remember me</label>
                     </div>
                     <a href="#" className="login__forgot">Forgot Password?</a>
                  </div>
                  <button type="submit" className="login__button">Login</button>
                  <p className="login__register">
                     Don't have an account? <a href="#">Register</a>
                  </p>
               </form>
            </div>
            {/*=============== MAIN JS ===============*/}
         </div>

      </div>
   )
}
