import React from 'react'
import Footer from './Footer'

const FooterHandler = () => {
  return (
    <div>
     <div>
      {path.startsWith("/admin") ||
      path.startsWith("/login") ||
      path.startsWith("/signup") ||
      path.startsWith("/forgot-password") ||
      path.startsWith("/reset-password") ? (
        ""
      ) : (
        <Footer />
      )}
    </div> 
    </div>
  )
}

export default FooterHandler
