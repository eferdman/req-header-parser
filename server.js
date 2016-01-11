var express = require("express")
var path = require("path")
var app = express()

app.listen(process.env.PORT || 3000)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/whoami', function(req, res) {
    var result = {
        "ipaddress" : null, "language" : null, "software": null
    }
    result.ipaddress = req.headers['x-forwarded-for']

    //format language
    var lang = req.headers['accept-language']
    lang = lang.split(',')[0]
    result.language = lang
    //format os
    var ua = req.headers['user-agent']
    var os = ua.slice(ua.indexOf('(') + 1, ua.indexOf(')') )
    result.software = os
    
    res.json(result)
});