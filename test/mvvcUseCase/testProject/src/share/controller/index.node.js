export class Controller {
  title = null
  link = null
  body = `<div id="app"></div>`
  script = `<script src='./bundle.js'></script>`

  getHtml = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      ${this.link || ''}
      <title>${this.title || ''}</title>
    </head>
    <body>
      ${this.body || ''}
      ${this.script || ''}
    </body>
    </html>`
  }

  getPageName(pageDirname) {
    const paths = pageDirname.split('/')
    return paths[paths.length - 2]
  }

  webpackBaseConfig = {
  }
}

export default new Controller()

