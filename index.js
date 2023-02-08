const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

const newssources =[

    {
        name: 'coindesk',
        address: 'https://www.coindesk.com/',
        base:'https://www.coindesk.com' 

    },
    {
        name: 'theblock',
        address: 'https://www.theblock.co/',
        base: 'https://www.theblock.co'

    },
    {
        name: 'blockworks',
        address: 'https://blockworks.co/',
        base: 'https://blockworks.co'

    }, 
    {
        name: 'decrypt',
        address: 'https://decrypt.co/',
        base: 'https://decrypt.co'

    }
]

const articles = []

newssources.forEach(newssources=>{
    axios.get(newssources.address)
        .then(response=>{
            const html =response.data
            const $ = cheerio.load(html)

            $('a:contains("Wallet"), a:contains("Ledger"), a:contains("Hack"), a:contains("Breach"), a:contains("Exploit"), a:contains("Loss")', html).each(function() {
                const title  = $(this).text()
                const url  = $(this).attr('href')

                articles.push({
                    title,
                    url: newssources.base + url,
                    source: newssources.name

                })

            })

        })
})

app.get('/', (req,res)=> {
    res.json('Welcome to the Ledger news watch!')
})

app.get('/news', (req,res)=> {
    res.json(articles)
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

