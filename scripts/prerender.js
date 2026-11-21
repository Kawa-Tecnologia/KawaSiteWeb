const fs = require('fs')
const path = require('path')

const BUILD = path.join(__dirname, '..', 'build')
const SITE = 'https://kawa-site-web-ten.vercel.app'

const ROUTES = [
  {
    path: '/',
    title: 'Kawa Tecnologia | Sites, lojas e software sob medida',
    description: 'Criamos sites, lojas virtuais e sistemas sob medida, unindo design, engenharia e estratégia para converter visitas em negócio. Fale com a Kawa.',
    heading: 'Construímos produtos e experiências tecnológicas que convertem.',
    text: 'Da ideia ao lançamento, unimos design, engenharia e estratégia para elevar sua presença digital com velocidade, precisão e inovação.'
  },
  {
    path: '/tips',
    title: 'Dicas para sites, lojas e sistemas | Kawa Tecnologia',
    description: 'Guias práticos para decidir o próximo website, loja virtual ou sistema da sua empresa, com metas claras e um caminho objetivo. Fale com a Kawa.',
    heading: 'Antes de começar, transforme dúvida em estratégia.',
    text: 'A Kawa ajuda empresas a definir o caminho certo para websites, lojas e sistemas com mais clareza, velocidade e resultado.'
  },
  {
    path: '/about-us',
    title: 'Sobre a Kawa Tecnologia | Propósito, visão e valores',
    description: 'Conheça a missão, a visão e os valores da Kawa e como unimos tecnologia e estratégia para transformar ideias em presença digital. Fale com a equipe.',
    heading: 'Construímos soluções digitais com propósito, estratégia e visão de futuro.',
    text: 'A Kawa é uma empresa que une tecnologia, criatividade e entendimento de negócio para transformar desafios em oportunidades.'
  },
  {
    path: '/solutions',
    title: 'Kawa Solutions | Sites, lojas e software sob medida',
    description: 'Peça sites, lojas virtuais, software e treinamentos. A Kawa une design, engenharia e estratégia, da ideia ao lançamento do seu projeto. Conte o seu projeto.',
    heading: 'Transforme ideias em produtos digitais com excelência.',
    text: 'Criamos websites, lojas virtuais, plataformas e soluções sob medida para impulsionar resultados reais.'
  },
  {
    path: '/solutions/tips',
    title: 'Como planejar seu projeto digital | Kawa Tecnologia',
    description: 'Orientações para planejar sites, lojas virtuais e sistemas antes de desenvolver, com foco em clareza, escala e resultado. Um guia da Kawa Tecnologia.',
    heading: 'Planejar é o primeiro grande diferencial de qualquer projeto de tecnologia.',
    text: 'A Kawa transforma ideias em soluções com foco em clareza, crescimento e experiência de uso.'
  },
  {
    path: '/solutions/doubts',
    title: 'Perguntas frequentes da Kawa | Lojas, sites e software',
    description: 'Respostas sobre custos, prazos e processos para criar uma loja virtual, um site ou um sistema com a equipe da Kawa Tecnologia. Veja antes de começar.',
    heading: 'Perguntas Frequentes',
    text: 'Respostas sobre custos, prazos e processos para criar uma loja virtual, um site ou um sistema com a equipe da Kawa Tecnologia.'
  },
  {
    path: '/request-devs',
    title: 'Solicite um projeto de tecnologia | Kawa Tecnologia',
    description: 'Conte o que você precisa. A Kawa prepara uma proposta de site, loja virtual ou software sob medida para a sua empresa. Retornamos com clareza.',
    heading: 'Solicite um serviço',
    text: 'Conte o que você precisa e conecte-se com especialistas da Kawa Tecnologia de forma rápida e segura.'
  },
  {
    path: '/solutions/thankyou',
    title: 'Obrigado pela sua avaliação | Kawa Tecnologia',
    description: 'Recebemos a sua avaliação. A Kawa agradece o retorno sobre o atendimento.',
    heading: 'Obrigado pela sua avaliação!',
    text: 'Recebemos a sua avaliação. A Kawa agradece o retorno sobre o atendimento.',
    noindex: true
  },
  {
    path: '/survey-devs',
    title: 'Pesquisa de avaliação | Kawa Tecnologia',
    description: 'Formulário interno para avaliar o atendimento de um prestador da Kawa Tecnologia.',
    heading: 'Pesquisa de Avaliação do Prestador de Serviço',
    text: 'Formulário interno para avaliar o atendimento de um prestador da Kawa Tecnologia.',
    noindex: true
  },
  {
    path: '/under-construction',
    title: 'Página em construção | Kawa Tecnologia',
    description: 'Esta página da Kawa Tecnologia ainda está em desenvolvimento.',
    heading: 'Em Construção',
    text: 'Esta página ainda está em desenvolvimento. Volte em breve para ver o conteúdo completo!',
    noindex: true
  }
]

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function setTitle(html, title) {
  if (!/<title>[\s\S]*?<\/title>/.test(html)) throw new Error('title não encontrado')
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
}

function setMeta(html, attribute, name, content) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}=(["'])${name}\\1\\s+content=(["'])[\\s\\S]*?\\2\\s*\\/?>`,
    'i'
  )
  if (!pattern.test(html)) throw new Error(`meta ${attribute}=${name} não encontrado`)
  return html.replace(
    pattern,
    `<meta ${attribute}="${name}" content="${escapeHtml(content)}">`
  )
}

function setCanonical(html, href) {
  const pattern = /<link\s+rel=(["'])canonical\1\s+href=(["'])[\s\S]*?\2\s*\/?>/i
  if (!pattern.test(html)) throw new Error('canonical não encontrado')
  return html.replace(pattern, `<link rel="canonical" href="${escapeHtml(href)}">`)
}

function removeCanonical(html) {
  return html.replace(/<link\s+rel=(["'])canonical\1\s+href=(["'])[\s\S]*?\2\s*\/?>/i, '')
}

function setRoot(html, heading, text) {
  const pattern = /<div id="root">[\s\S]*?<\/div>/
  if (!pattern.test(html)) throw new Error('div#root não encontrado')
  const block = `<div id="root"><main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(text)}</p></main></div>`
  return html.replace(pattern, block)
}

function outputFile(routePath) {
  if (routePath === '/') return path.join(BUILD, 'index.html')
  return path.join(BUILD, routePath.replace(/^\//, ''), 'index.html')
}

function render(template, route) {
  const url = `${SITE}${route.path === '/' ? '/' : route.path}`
  let html = template
  html = setTitle(html, route.title)
  html = setMeta(html, 'name', 'description', route.description)
  html = setMeta(html, 'property', 'og:title', route.title)
  html = setMeta(html, 'property', 'og:description', route.description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'name', 'twitter:title', route.title)
  html = setMeta(html, 'name', 'twitter:description', route.description)
  html = setRoot(html, route.heading, route.text)

  if (route.noindex) {
    html = removeCanonical(html)
    if (!html.includes('name="robots"')) {
      html = html.replace('</head>', '<meta name="robots" content="noindex"></head>')
    }
  } else {
    html = setCanonical(html, url)
  }

  return html
}

function main() {
  const shellPath = path.join(BUILD, 'index.html')
  if (!fs.existsSync(shellPath)) {
    throw new Error('build/index.html não existe. Rode o build antes do pré-render.')
  }

  const template = fs.readFileSync(shellPath, 'utf8')
  if (!template.includes('<div id="root"></div>') && !template.includes('<div id="root">')) {
    throw new Error('build/index.html não tem div#root')
  }

  for (const route of ROUTES) {
    const html = render(template, route)
    const file = outputFile(route.path)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, html)
    console.log(`prerender ${route.path}`)
  }
}

try {
  main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
