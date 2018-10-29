let app = require(`express`)(),
	server = require(`http`).Server(app),
	io = require(`socket.io`)(server),
	fs = require(`fs`)
let port = 3000

let _cl = false, _cm = false

app.use(require(`express`).static(`client`))
server.listen(port, () => { console.log(`server started on port ${port}`) })
io.on(`connection`, (_s) => {
	var json = JSON.parse(fs.readFileSync(`client/dir.json`, `utf8`))
	_s.on(`dl`, () => {
		json.lights.splice(0, 1)
		fs.writeFile(`client/dir.json`, JSON.stringify(json), (err) => { if (err) throw err })
	})
	_s.on(`do`, () => {
		json.objects.splice(0, 1)
		fs.writeFile(`client/dir.json`, JSON.stringify(json), (err) => { if (err) throw err })
	})
	_s.on(`ml`, (_i) => {
		json.lights.push(_i)
		fs.writeFile(`client/dir.json`, JSON.stringify(json), (err) => { if (err) throw err })
		io.emit(`lm`, _i)
	})
	_s.on(`mo`, (_i) => {
		json.objects.push(_i)
		fs.writeFile(`client/dir.json`, JSON.stringify(json), (err) => { if (err) throw err })
		io.emit(`om`, _i)
	})
})
