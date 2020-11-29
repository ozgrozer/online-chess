const path = require('path')
const express = require('express')
const app = express()
const port = 1230

const defaults = require.main.require('./defaults')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

const getTimeForConsole = () => new Date(Date.now()).toLocaleString() + ':'

app.listen(port, () => {
  console.log(getTimeForConsole(), `${defaults.site.name}: http://localhost:${defaults.site.port}`)
})

app.get('*', (req, res) => {
  res.render('App', {
    defaults: {
      siteName: defaults.site.name
    }
  })
})
