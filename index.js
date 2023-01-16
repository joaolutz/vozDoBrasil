require('dotenv').config()
const puppeteer = require('puppeteer')
const express = require('express')

const URL = "https://redenacionalderadio.ebc.com.br/programas/a-voz-do-brasil-download"

function start() {

  const app = express()
  const port = 3000

  app.get('/', (req, res) => {
    console.info("Iniciando bot...")
    robot().then(() => {
      res.send('Robot executed.')
    }).catch((err) => {
      res.send({ code: 999, erro: 'Ocorreu um erro no bot: ' + err })
    })
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  //console.log(process.env.LOGIN)
  
};

async function robot() {
  const browser = await puppeteer.launch({
    headless: true
  })

  console.info("Opening browser...")

  const pages = await browser.pages() //await browser.newPage();
  const page = pages[0]

  console.info("Opening site...")
  await page.goto(URL)
  
  //clica no botão para aceitar os cookies
  await page.click('#viewlet-disclaimer > div > button')

  console.info("Fazendo download do ultimo programa Voz do Brasil...")
  await page.click('#content-core > div > div > div:nth-child(1) > div > div.d-flex.align-items-center.align-items-sm-start.flex-row.flex-sm-column.h-100 > div > a')
  
  console.info("Wait for download to finish...")
  await page.waitForTimeout(30000)

  console.info("File downloaded")
  
  await page.close()

  await browser.close()
  console.info("Closing browser...")
}

start()
// .catch((err) => {
//   console.error(err);
// });
