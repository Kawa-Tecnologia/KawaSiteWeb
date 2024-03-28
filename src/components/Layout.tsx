import React, { ReactNode } from 'react'
interface LayoutProps {
  children: ReactNode
  pageTitle: string
  pageDescription: string
}
const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  pageDescription
}) => {
  return (
    <div>
      <head>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />
      </head>
      <body>{children}</body>
    </div>
  )
}

export default Layout
