module.exports = {
  getHtmlByFrame,
  getHtml
}
function getHtmlByFrame({
  title,
  link,
  script,
  body
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  ${link || ''}
  <title>${title || ''}</title>
</head>
<body>
  ${body || ''}
  ${script || ''}
</body>
</html>`
}

function getHtml() {
    return getHtmlByFrame({
      script: `
        <script src='./bundle.js'>123</script>
      `
    })
}