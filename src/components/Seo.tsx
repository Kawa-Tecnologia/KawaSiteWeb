import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export const SITE = 'https://kawa-site-web-ten.vercel.app'

type SeoProps = {
  title: string
  description: string
  path?: string
  noindex?: boolean
}

const Seo: React.FC<SeoProps> = ({ title, description, path = '/', noindex = false }) => {
  const url = `${SITE}${path}`

  useEffect(() => {
    if (!noindex) return
    document.querySelectorAll('link[rel="canonical"]').forEach((node) => node.remove())
  }, [noindex])

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      {noindex ? <meta name='robots' content='noindex' /> : <link rel='canonical' href={url} />}
      {noindex ? null : <meta property='og:url' content={url} />}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  )
}

export default Seo
