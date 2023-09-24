import React, { memo } from 'react'
import { Link } from 'react-router-dom'

interface BackButtonProps{
    url:string,
    text:string,
    addClassName:string
}

const BackButton:React.FC<BackButtonProps> = ({url,text,addClassName}) => {
  return (
    <Link to={url}  className={`text-decoration-none fs-5 ${addClassName}  `}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="  bi bi-arrow-left me-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>{text}</Link>
  )
}

export default memo(BackButton)