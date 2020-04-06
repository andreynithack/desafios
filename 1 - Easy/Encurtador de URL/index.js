const express = require('express')
const random = require('./randomCode')

const sqlite3 = require( 'sqlite3')
const { open } = require('sqlite')


app = new express()

app.use(express.json())
//config SQLITE

const sql = 'SELECT URL, NEWURL, DATALIMITE FROM LINKS WHERE NEWURL = ?';
const urlBase = "http://localhost:3000/"
//fim confg

open({
    filename: './links.db',
    driver: sqlite3.Database
  }).then((db) => {

app.get('/:newURL', async (req,res)=>{
    let {newURL} = req.params
    let data = new Date()
    try {
        let {URL, DATALIMITE} = await db.get(sql,[newURL]);
        let ID = await db.all('SELECT ID FROM LINKS')
        if (DATALIMITE <= data.toDateString){
            return res.send(`<center><h1>Seu Link é <br><a href="${URL}">${URL}<a/><br> <p> Numero Total de Links: ${ID.length} </p>
            <h3>Duração do link : ${DATALIMITE}
            </h1></center>`)
        }
    } catch (error) {
        return res.send('<center><h1>Seu Link é Invalido</h1></center>')
    }
    
});
app.post('/',async (req,res)=>{
    let {url} = req.body
    let code = random()
    let dataAtual = new Date()
    let dataLimite = new Date(dataAtual.getFullYear(),dataAtual.getMonth(),dataAtual.getDate()+7)
    try {
        await db.run("INSERT INTO LINKS(URL,NEWURL,DATALIMITE) VALUES (?,?,?)",[url,code,dataLimite.toDateString()])      
        return res.json({"NEWURL": urlBase + code })
    } catch (error) {
        return res.alert('Erro ao encurtar link, os parametros enviados deve serm {"url":"URL A SER ENCURTADA"}')
    }
   
})

app.listen(3000,(req, res)=>{
    console.log('Server Conectado')
})
})