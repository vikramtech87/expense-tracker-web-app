import React from 'react'

type FormCardProps = {
  children: React.ReactNode
}

const FormCard = ({children}: FormCardProps) => {
  return (
    <div className="w-full max-w-sm">{children}</div>
  )
}

export default FormCard;