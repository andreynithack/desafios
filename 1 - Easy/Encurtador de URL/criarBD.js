var sqlite = require('sqlite-sync')

sqlite.connect('links.db')

sqlite.run("CREATE TABLE IF NOT EXISTS LINKS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, URL TEXT NOT NULL, NEWURL TEXT NOT NULL, DATALIMITE TEXT NOT NULL);",function(res){
    if(res.error)
        throw res.error;
    console.log(res);
});
 

let data = new Date()
const nomes = ['http://google.com','http://facebook.com','http://yahoo.com','http://gmail.com','http://nithack.com','http://leitor.com','http://mangahosted.com']
const url =  ['45852','58452','12584','14588','45896','89632','15648']
const dataLimite = [data.toDateString(),data.toDateString(),data.toDateString(),data.toDateString(),data.toDateString(),data.toDateString(),data.toDateString()]
const tabela = [nomes,url,dataLimite]

for (let index = 0; index < tabela[1].length; index++) {
    sqlite.insert("LINKS",{URL:tabela[0][index],NEWURL:tabela[1][index], DATALIMITE:tabela[2][index]}, function(res){
        if(res.error)
            throw res.error;
        console.log(res)})
}

 