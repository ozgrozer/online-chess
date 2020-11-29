const path = require('path')
const express = require('express')
const app = express()

const defaults = require.main.require('./defaults')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

const getTimeForConsole = () => new Date(Date.now()).toLocaleString() + ':'

const port = process.env.PORT || defaults.site.port
app.listen(port, () => {
  console.log(getTimeForConsole(), `${defaults.site.name}: http://localhost:${port}`)
})

app.get('*', (req, res) => {
  res.render('app', {
    defaults: {
      siteName: defaults.site.name
    }
  })
})
