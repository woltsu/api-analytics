const router = require('express').Router()
const { addLog } = require('../elastic')

const response = `
  <html style='width: 100%; height: 100%;'>
    <body style='display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex;'>
      <p style='margin: auto; font-size: 40px; font-weight: bold;'>:-)</p>
    </body>
  </html>
`

router.get('/', async (req, res) => {
  try {
    const {
      baseUrl,
      route,
      body,
      headers,
      query
    } = req

    await addLog({
      baseUrl,
      route,
      body,
      headers,
      query
    })
    res.status(200).send(response)
  } catch (e) {
    console.error('Error', e)
  }
})

module.exports = router