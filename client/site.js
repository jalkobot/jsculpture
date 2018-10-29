let socket = io.connect()
socket.on(`connect`, () => {
	console.log(`connected on ${socket.id}`)
})

var _xml = new XMLHttpRequest(), _json
_xml.open(`GET`, `dir.json`, true)
_xml.onreadystatechange = () => { if (_xml.readyState === 4 && (_xml.status === 0 || _xml.status === 200)) {
	_json = JSON.parse(_xml.responseText)
	socket.emit(`uj`, _json)
	console.log(_json)
}}
_xml.send()
