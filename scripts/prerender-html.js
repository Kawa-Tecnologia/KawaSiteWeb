const fs = require('fs')
const path = require('path')
const { SITE, routes } = require('../src/seo/routes')

const buildDir = path.join(__dirname, '..', 'build')
const templatePath = path.join(buildDir, 'index.html')

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error('Tag não encontrada no index.html do build: ' + pattern)
  }
  return html.replace(pattern, replacement)
}

function render(template, route) {
  const url = `${SITE}${route.path === '/' ? '/' : route.path}`
  let html = template

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${esc(route.description)}">`
  )
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${esc(route.title)}">`
  )
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${esc(route.description)}">`
  )
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${esc(route.title)}">`
  )
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${esc(route.description)}">`
  )

  if (route.noindex) {
    html = html.replace(/<link rel="canonical" href="[^"]*">/, '')
    html = html.replace(/<meta property="og:url" content="[^"]*">/, '')
    if (!html.includes('name="robots"')) {
      html = html.replace('</head>', '<meta name="robots" content="noindex"></head>')
    }
  } else {
    html = replaceTag(
      html,
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${url}">`
    )
    html = replaceTag(
      html,
      /<meta property="og:url" content="[^"]*">/,
      `<meta property="og:url" content="${url}">`
    )
  }

  const fallback = `<div id="root"><main><h1>${esc(route.heading)}</h1><p>${esc(route.description)}</p></main></div>`
  html = replaceTag(html, /<div id="root">\s*<\/div>/, fallback)
  return html
}

function writeRoute(template, route) {
  const html = render(template, route)
  if (route.file) {
    fs.writeFileSync(path.join(buildDir, route.file), html)
    return
  }
  if (route.path === '/') {
    fs.writeFileSync(templatePath, html)
    return
  }
  const dir = path.join(buildDir, route.path)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

if (!fs.existsSync(templatePath)) {
  throw new Error('build/index.html não existe. Rode o build antes.')
}

const template = fs.readFileSync(templatePath, 'utf8')
routes.forEach((route) => writeRoute(template, route))
console.log('HTML estático gerado para ' + routes.map((route) => route.path).join(', '))
