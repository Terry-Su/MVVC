const Controller = {
  title: null,
  link: null,
  body: `<div id="app"></div>`,  
  script: `<script src='./bundle.js'></script>`,

  getHtml,
  getPageName
}

module.exports = Controller

function getHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  ${Controller.link || ''}
  <title>${Controller.title || ''}</title>
</head>
<body>
  ${Controller.body || ''}
  ${Controller.script || ''}
</body>
</html>`
}

function getPageName(pageDirname) {
  const paths = pageDirname.split('/')
  return paths[paths.length - 2]
}