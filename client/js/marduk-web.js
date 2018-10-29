const _c = document.querySelector(`canvas`)
const _b = new BABYLON.Engine(_c, true)
let _a = 0, _e = false

BABYLON.GUI.Button.CreateIconButton = function (_n, _u) {
	let _r = new BABYLON.GUI.Button(_n),
		_i = new BABYLON.GUI.Image(`${_n}I`, _u)
	_i.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM
	_i.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
	_r.addControl(_i)
	return _r
}

const BUILD_LIGHT = function (_z, _s) {
	let _q = new BABYLON.GUI.SelectionPanel(`pLX0`),
		_o = new BABYLON.GUI.Button.CreateSimpleButton(`bLX0`, `Create`),
		_a = new BABYLON.GUI.Button.CreateSimpleButton(`bmX3`, `Cancel`)
	_z.removeControl(_q)
	_z.removeControl(_o)
	let _j = new BABYLON.GUI.SliderGroup(`Color`),
		_v = new BABYLON.GUI.SliderGroup(`Position`)

	let _c = { b: 1, g: 1, r: 1 },
		_x = {
			x: _s.cameras[0].getTarget().x,
			y: _s.cameras[0].getTarget().y,
			z: _s.cameras[0].getTarget().z
		},
		_l = new BABYLON.PointLight(`lXt`, _x, _s)

	_l.diffuse = new BABYLON.Color3(_c.r, _c.g, _c.b)
	_l.specular = new BABYLON.Color3(0, 0, 0)

	_v.addSlider(`X`, (_d) => {
		_x.x = _d
		_l.position.x = _d
	}, ``, -20, 20, _x.x, (_d) => { return _d.toFixed(2) })
	_v.addSlider(`Y`, (_d) => {
		_x.y = _d
		_l.position.y = _d
	}, ``, -20, 20, _x.y, (_d) => { return _d.toFixed(2) })
	_v.addSlider(`Z`, (_d) => {
		_x.z = _d
		_l.position.z = _d
	}, ``, -20, 20, _x.z, (_d) => { return _d.toFixed(2) })

	_j.addSlider(`Red`, (_d) => {
		_c.r = _d
		_l.diffuse = new BABYLON.Color3(_c.r, _c.g, _c.b)
	}, ``, 0, 1, _c.r, (_d) => { return _d.toFixed(2) } )
	_j.addSlider(`Green`, (_d) => {
		_c.g = _d
		_l.diffuse = new BABYLON.Color3(_c.r, _c.g, _c.b)
	}, ``, 0, 1, _c.g, (_d) => { return _d.toFixed(2) } )
	_j.addSlider(`Blue`, (_d) => {
		_c.b = _d
		_l.diffuse = new BABYLON.Color3(_c.r, _c.g, _c.b)
	}, ``, 0, 1, _c.b, (_d) => { return _d.toFixed(2) } )
	_j.selectors[0].color = `#F00`
	_j.selectors[1].color = `#0F0`
	_j.selectors[2].color = `#00F`
	for (let _f in _j.selectors) {
		let _p = _j.selectors[_f]
		_p.height = `54px`
	}

	_q.addGroup(_v)
	_q.addGroup(_j)
	_q.width = 0.2
	_q.height = 0.6
	_q.top = `-5%`
	_q.left = `-10px`
	_q.fontSize = `14px`
	_q.spacerHeight = `1px`
	_q.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_q.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_q.background = `white`
	_q.shadowOffsetY = -6
	_q.shadowColor = `#FC0`
	_z.addControl(_q)

	_o.width = 0.1
	_o.height = 0.1
	_o.top = `35%`
	_o.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_o.left = `-10px`
	_o.background = `white`
	_o.shadowOffsetY = -6
	_o.shadowColor = `#6F6`
	_o.onPointerUpObservable.add(() => {
		for (let _r = 0; _r < _s.lights.length; _r++) if (_s.lights[_r].id === `lXt`) _s.lights.splice(_r, 1)
		let _i = { c: _c, x: _x.x, y: _x.y, z: _x.z }
		socket.emit(`ml`, _i)
		_z.removeControl(_q)
		_z.removeControl(_o)
		_z.removeControl(_a)
	})
	_z.addControl(_o)

	_a.width = 0.1
	_a.height = 0.1
	_a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_a.top = `35%`
	_a.left = `-11% - 10px`
	_a.background = `white`
	_a.shadowOffsetY = -6
	_a.shadowColor = `#F60`
	_a.onPointerUpObservable.add(() => {
		_z.removeControl(_q)
		_z.removeControl(_o)
		_z.removeControl(_a)
		for (let _i = 0; _i < _s.lights.length; _i++) if (_s.lights[_i].id == `lXt`) _s.lights.splice(_i, 1)
	})
	_z.addControl(_a)
}
const BUILD_MESH = function (_z, _s) {
	let _q = new BABYLON.GUI.SelectionPanel(`pMX0`),
		_f = new BABYLON.GUI.SelectionPanel(`pMX1`),
		_e = new BABYLON.GUI.Button.CreateSimpleButton(`bMX0`, `Next`),
		_u = new BABYLON.GUI.Button.CreateSimpleButton(`bMX1`, `Create`),
		_t = new BABYLON.GUI.Button.CreateSimpleButton(`bmX2`, `Back`),
		_a = new BABYLON.GUI.Button.CreateSimpleButton(`bmX3`, `Cancel`)
	_z.removeControl(_q)
	_z.removeControl(_f)
	_z.removeControl(_e)
	_z.removeControl(_u)
	let _k = new BABYLON.GUI.RadioGroup(`Type`),
		_j = new BABYLON.GUI.SliderGroup(`Dimensions`),
		_v = new BABYLON.GUI.SliderGroup(`Position`),
		_b = new BABYLON.GUI.SliderGroup(`Rotation`),
		_n = new BABYLON.GUI.SliderGroup(`Properties`)

	let _g = new BABYLON.StandardMaterial(`kX0`, _s)
	_g.diffuseColor = new BABYLON.Color3(1, 1, 1)
	_g.maxSimultaneousLights = 20
	let _l = { _d: 1, _h: 1, _n: 1, _o: 1, _t: `box`, _w: 1 },
		_m = new BABYLON.MeshBuilder.CreateBox(`mXt`, { depth: 1, height: 1, width: 1 }, _s)
	_m.setPositionWithLocalVector(_s.cameras[0].getTarget())
	_n.material = _g
	_l._x = _s.cameras[0].getTarget().x
	_l._y = _s.cameras[0].getTarget().y
	_l._z = _s.cameras[0].getTarget().z

	let changeMeshType = function (_b) {
		for (let _h = _j.selectors.length - 1; _h >= 0; _h--) _j.removeSelector(_h)
		for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
		if (_b === 0) {
			_l._t = `box`
			_j.addSlider(`Width`, (_d) => {
				_l._w = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateBox(`mXt`, { depth: _l._d, height: _l._h, width: _l._w }, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, BABYLON.Epsilon, 10, _l._w, (_d) => { return _d.toFixed(2) })
			_j.addSlider(`Height`, (_d) => {
				_l._h = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateBox(`mXt`, { depth: _l._d, height: _l._h, width: _l._w }, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, BABYLON.Epsilon, 10, _l._h, (_d) => { return _d.toFixed(2) })
			_j.addSlider(`Depth`, (_d) => {
				_l._d = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateBox(`mXt`, { depth: _l._d, height: _l._h, width: _l._w }, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, BABYLON.Epsilon, 10, _l._d, (_d) => { return _d.toFixed(2) })

			if (typeof _l._d != `number`) _l._d = 1
			if (typeof _l._h != `number`) _l._h = 1
			if (typeof _l._w != `number`) _l._w = 1
			_m = new BABYLON.MeshBuilder.CreateBox(`mXt`, { depth: _l._d, height: _l._h, width: _l._w }, _s)
			_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
		} else if (_b === 1) {
			_l._t = `cyl`
			if (typeof _l._h != `number`) _l._h = 1
			if (typeof _l._k != `number`) _l._k = 1
			if (typeof _l._l != `number`) _l._l = 1
			if (typeof _l._s != `number`) _l._s = 16

			_j.addSlider(`Height`, (_d) => {
				_l._h = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateCylinder(`mXt`, {
					diameterBottom: _l._l,
					diameterTop: _l._k,
					height: _l._h,
					subdivisions: _l._s
				}, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, BABYLON.Epsilon, 10, _l._h, (_d) => { return _d.toFixed(2) })
			_j.addSlider(`Diameter: Top`, (_d) => {
				_l._k = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateCylinder(`mXt`, {
					diameterBottom: _l._l,
					diameterTop: _l._k,
					height: _l._h,
					subdivisions: _l._s
				}, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, BABYLON.Epsilon, 10, _l._k, (_d) => { return _d.toFixed(2) })
			_j.addSlider(`Diameter: Bottom`, (_d) => {
				_l._l = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateCylinder(`mXt`, {
					diameterBottom: _l._l,
					diameterTop: _l._k,
					height: _l._h,
					subdivisions: _l._s
				}, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, BABYLON.Epsilon, 10, _l._l, (_d) => { return _d.toFixed(2) })

			_m = new BABYLON.MeshBuilder.CreateCylinder(`mXt`, {
				diameterBottom: _l._l,
				diameterTop: _l._k,
				height: _l._h,
				subdivisions: _l._s
			}, _s)
			_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
		} else {
			_l._t = `sphr`
			if (typeof _l._j != `number`) _l._j = 1
			if (typeof _l._s != `number`) _l._s = 16

			_j.addSlider(`Diameter`, (_d) => {
				_l._j = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateSphere(`mXt`, {
					diameter: _l._j,
					segments: _l._s
				}, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, BABYLON.Epsilon, 10, _l._j, (_d) => { return _d.toFixed(2) })
			_j.addSlider(`Subdivisions`, () => {
				_l._s = _d

				for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
				_m = new BABYLON.MeshBuilder.CreateSphere(`mXt`, {
					diameter: _l._j,
					segments: _l._s
				}, _s)
				_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
			}, ``, 4, 128, _l._s, (_d) => { return _d.toFixed(0) })

			_m = new BABYLON.MeshBuilder.CreateSphere(`mXt`, {
				diameter: _l._j,
				segments: _l._s
			}, _s)
			_m.setPositionWithLocalVector(new BABYLON.Vector3(_l._x, _l._y, _l._z))
		}
		_n.material = _g
	}

	_k.addRadio(`Box`, changeMeshType, true)
	_k.addRadio(`Cylinder`, changeMeshType)
	_k.addRadio(`Sphere`, changeMeshType)

	_v.addSlider(`X`, (_d) => {
		_l._x = _d
		_m.position.x = _d
	}, ``, -20, 20, _l._x, (_d) => { return _d.toFixed(2) })
	_v.addSlider(`Y`, (_d) => {
		_l._y = _d
		_m.position.y = _d
	}, ``, -20, 20, _l._y, (_d) => { return _d.toFixed(2) })
	_v.addSlider(`Z`, (_d) => {
		_l._z = _d
		_m.position.z = _d
	}, ``, -20, 20, _l._z, (_d) => { return _d.toFixed(2) })

	_b.addSlider(`X`, (_d) => {
		_d *= Math.PI
		_d /= 180
		_l._a = _d

		_m.rotation = new BABYLON.Vector3(_l._a, _l._b, _l._c)
	}, `degrees`, 0, 359, _l._a, (_d) => { return _d.toFixed(2) })
	_b.addSlider(`Y`, (_d) => {
		_d *= Math.PI
		_d /= 180
		_l._b = _d

		_m.rotation = new BABYLON.Vector3(_l._a, _l._b, _l._c)
	}, `degrees`, 0, 359, _l._b, (_d) => { return _d.toFixed(2) })
	_b.addSlider(`Z`, (_d) => {
		_d *= Math.PI
		_d /= 180
		_l._c = _d

		_m.rotation = new BABYLON.Vector3(_l._a, _l._b, _l._c)
	}, `degrees`, 0, 359, _l._c, (_d) => { return _d.toFixed(2) })

	_n.addSlider(`Scale`, (_d) => {
		_l._n = _d

		_m.scaling = new BABYLON.Vector3(_d, _d, _d)
	}, ``, BABYLON.Epsilon, 5, _l._n, (_d) => { return _d.toFixed(2) })
	_n.addSlider(`Opacity`, (_d) => {
		_l._o = _d

		_m.visibility = _d
	}, ``, 0, 1, _l._o, (_d) => { return _d.toFixed(2) })

	_f.addGroup(_v)
	_f.addGroup(_b)
	_f.addGroup(_n)
	_f.width = 0.2
	_f.height = 0.81
	_f.top = `-7%`
	_f.left = `-10px`
	_f.fontSize = `14px`
	_f.spacerHeight = `1px`
	_f.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_f.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_f.background = `white`
	_f.shadowOffsetY = -6
	_f.shadowColor = `#09F`

	_u.width = 0.1
	_u.height = 0.1
	_u.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_u.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_u.top = `42%`
	_u.left = `-10px`
	_u.background = `white`
	_u.shadowOffsetY = -6
	_u.shadowColor = `#6F6`
	_u.onPointerUpObservable.add(() => {
		for (let _r = 0; _r < _s.meshes.length; _r++) if (_s.meshes[_r].id === `mXt`) _s.meshes.splice(_r, 1)
		let _i = { a: _l._a, b: _l._b, c: _l._c, n: _l._n, o: _l._o, t: _l._t, x: _l._x, y: _l._y, z: _l._z }
		switch (_l._t) {
			case `box`:
				_i.d = _l._d
				_i.h = _l._h
				_i.w = _l._w
				break
			case `cyl`:
				_i.h = _l._h
				_i.k = _l._k
				_i.l = _l._l
				_i.s = _l._s
				break
			case `sphr`:
				_i.j = _l.j
				_i.s = _l.s
				break
		}
		socket.emit(`mo`, _i)
		_z.removeControl(_f)
		_z.removeControl(_t)
		_z.removeControl(_u)
	})

	_t.width = 0.1
	_t.height = 0.1
	_t.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_t.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_t.top = `42%`
	_t.left = `-11% - 10px`
	_t.background = `white`
	_t.shadowOffsetY = -6
	_t.shadowColor = `#C3F`
	_t.onPointerUpObservable.add(() => {
		_z.removeControl(_f)
		_z.removeControl(_t)
		_z.removeControl(_u)
		_z.addControl(_q)
		_z.addControl(_e)
		_z.addControl(_a)
	})

	_a.width = 0.1
	_a.height = 0.1
	_a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_a.top = `42%`
	_a.left = `-11% - 10px`
	_a.background = `white`
	_a.shadowOffsetY = -6
	_a.shadowColor = `#F60`
	_a.onPointerUpObservable.add(() => {
		_z.removeControl(_q)
		_z.removeControl(_e)
		_z.removeControl(_a)
		for (let _i = 0; _i < _s.meshes.length; _i++) if (_s.meshes[_i].id == `mXt`) {
			_s.meshes.splice(_i, 1)
			break
		}
	})
	_z.addControl(_a)

	_q.addGroup(_k)
	_q.addGroup(_v)
	_q.addGroup(_j)
	_q.width = 0.2
	_q.height = 0.81
	_q.top = `-7%`
	_q.left = `-10px`
	_q.fontSize = `14px`
	_q.spacerHeight = `1px`
	_q.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_q.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_q.background = `white`
	_q.shadowOffsetY = -6
	_q.shadowColor = `#09F`
	_z.addControl(_q)

	_e.width = 0.1
	_e.height = 0.1
	_e.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
	_e.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
	_e.top = `42%`
	_e.left = `-10px`
	_e.background = `white`
	_e.shadowOffsetY = -6
	_e.shadowColor = `#C3F`
	_e.onPointerUpObservable.add(() => {
		_z.removeControl(_q)
		_z.removeControl(_e)
		_z.removeControl(_a)
		_z.addControl(_f)
		_z.addControl(_t)
		_z.addControl(_u)
	})
	_z.addControl(_e)
}
const READER = function () {
	let _x = new XMLHttpRequest()
	_x.open(`GET`, `dir.json`, true)
	_x.onreadystatechange = () => { if (_x.readyState === 4 && (_x.status === 0 || _x.status === 200)) {
		_a = JSON.parse(_x.responseText)
	}}
	_x.send()
}
const PARSER = function (_m) {
	let _s = new BABYLON.Scene(_b),
		_z = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(`uiX0`, true),
		_f = new BABYLON.ArcRotateCamera(`arccam`, Math.PI / 4, Math.PI / 4, 35, new BABYLON.Vector3(0, 0, 0), _s, true)

	_s.activeCamera.panningSensibility = 0
	_f.attachControl(_c, true)
	_f.lowerRadiusLimit = 6
	_f.upperRadiusLimit = 36

	let _y = []
	_y.push(BABYLON.GUI.Button.CreateIconButton(`bX1`, `../res/light.png`))
	_y[0].width = 0.1
	_y[0].height = 0.1
	_y[0].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
	_y[0].left = `-20%`
	_y[0].background = `white`
	_y[0].thickness = 0
	_y[0].shadowOffsetY = -6
	_y[0].shadowColor = `#FC0`
	_y[0].onPointerUpObservable.add(() => {
		let _t = true
		for (let _l of _s.lights) if (_l.id === `lXt`) _t = false
		for (let _m of _s.meshes) if (_m.id === `mXt`) _t = false
		if (_t && _e) BUILD_LIGHT(_z, _s)
	})
	_z.addControl(_y[0])

	_y.push(BABYLON.GUI.Button.CreateIconButton(`bX2`, `../res/square.png`))
	_y[1].width = 0.1
	_y[1].height = 0.1
	_y[1].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
	_y[1].left = `20%`
	_y[1].background = `white`
	_y[1].thickness = 0
	_y[1].shadowOffsetY = -6
	_y[1].shadowColor = `#09F`
	_y[1].onPointerUpObservable.add(() => {
		let _t = true
		for (let _l of _s.lights) if (_l.id === `lXt`) _t = false
		for (let _m of _s.meshes) if (_m.id === `mXt`) _t = false
		if (_t && _e) BUILD_MESH(_z, _s)
	})
	_z.addControl(_y[1])

	_y.push(new BABYLON.GUI.Rectangle())
	_y[2].width = 0.7
	_y[2].height = 0.7
	_y[2].background = `#FFF`
	_y[2].shadowOffsetY = -6
	_y[2].shadowColor = `#C3F`
	_z.addControl(_y[2])

	_y.push(BABYLON.GUI.Button.CreateSimpleButton(`bX3`, `Begin`))
	_y[3].width = 0.1
	_y[3].height = 0.1
	_y[3].top = `25%`
	_y[3].color = `#FFF`
	_y[3].background = `#C3F`
	_y[3].onPointerUpObservable.add(() => {
		_z.removeControl(_y[2])
		_z.removeControl(_y[3])
		_z.removeControl(_y[4])
		_z.removeControl(_y[5])
		_e = true
	})
	_z.addControl(_y[3])

	_y.push(new BABYLON.GUI.TextBlock(`bX4`, `jsculpture`))
	_y[4].fontWeight = 700
	_y[4].fontSize = 30
	_y[4].top = `-25%`
	_z.addControl(_y[4])

	_y.push(new BABYLON.GUI.TextBlock(`bX5`,
		`jsculpture is an online collaborative project in which
		users can add shapes and lights to form a 3d sculpture

		lights and objects disappear over time, so the 3d space
		is always changing and shifting. exciting stuff

		built in javascript with babylonJS and a teaspoon of paprika`
	))
	_y[5].onPointerUpObservable.add(() => {
		_z.removeControl(_y[2])
		_z.removeControl(_y[3])
		_z.removeControl(_y[4])
		_z.removeControl(_y[5])
		_e = true
	})
	_z.addControl(_y[5])

	new BABYLON.MeshBuilder.CreateSphere(`mXB`, { diameter: 1, segments: 64 }, _s)
	_s.clearColor = new BABYLON.Color3(0.4, 0.4, 0.4)

	let _u = 0
	for (let _l of _m.lights) {
		++_u
		let _n = new BABYLON.PointLight(`lX${_u}`, new BABYLON.Vector3(_l.x, _l.y, _l.z), _s)
		_n.diffuse = new BABYLON.Color3(_l.c.r, _l.c.g, _l.c.b)
	}
	_u = 0
	let _k = new BABYLON.StandardMaterial(`kX0`, _s)
	_k.diffuseColor = new BABYLON.Color3(1, 1, 1)
	_k.maxSimultaneousLights = 20
	for (let _o of _m.objects) {
		++_u
		let _n
		switch (_o.t) {
			case `box`:
				_n = BABYLON.MeshBuilder.CreateBox(`mX${_u}`, {
					depth: _o.d,
					height: _o.h,
					width: _o.w
				}, _s)
				break
			case `cyl`:
				_n = BABYLON.MeshBuilder.CreateCylinder(`mX${_u}`, {
					diameterBottom: _o.l,
					diameterTop: _o.k,
					height: _o.h,
					subdivisions: _o.s
				}, _s)
				break
			case `sphr`:
				_n = BABYLON.MeshBuilder.CreateSphere(`mx${_u}`, {
					diameter: _o.j,
					segments: _o.s
				}, _s)
				break
		}
		_n.material = _k

		// Rotation
		_n.rotation = new BABYLON.Vector3(_o.a, _o.b, _o.c)

		// Position
		if (_o.x) _n.position.x = _o.x
		if (_o.y) _n.position.y = _o.y
		if (_o.z) _n.position.z = _o.z

		// Scale
		if (_o.n) _n.scaling = new BABYLON.Vector3(_o.n, _o.n, _o.n)

		// Opacity
		if (_o.o) _n._visibility = _o.o
	}
	_f.setTarget(BABYLON.Vector3.Zero())
	_f.attachControl(_c, true)
	return _s
}

window.addEventListener(`DOMContentLoaded`, () => {
//	READER()
	let _s
	let _t = setInterval(() => {
		if (typeof _json === `object`) {
			_s = PARSER(_json)
			_b.runRenderLoop(() => { if (_s.isReady()) _s.render() })
			clearInterval(_t)
		}
	}, 250)

	socket.on(`lm`, (_l) => {
		if (_s.lights.length > 4) {
			let _d = 0
			if (_s.meshes[_d].id == `lXt`) _d = 1
			_s.removeLight(_s.lights[_d])
			socket.emit(`dl`)
		}
		let _u = _s.lights.length, _n = new BABYLON.PointLight(`lX${_u}`, new BABYLON.Vector3(_l.x, _l.y, _l.z), _s)
		if (_l.c) _n.diffuse = new BABYLON.Color3(_l.c.r, _l.c.g, _l.c.b)
	})
	socket.on(`om`, (_m) => {
		if (_s.meshes.length > 20) {
			let _d = 0
			if (_s.meshes[_d].id == `mXt`) _d = 1
			_s.removeMesh(_s.meshes[_d])
			socket.emit(`do`)
		}
		let _n, _u = _s.meshes.length, _k = new BABYLON.StandardMaterial(`kX0`, _s)
		_k.diffuseColor = new BABYLON.Color3(1, 1, 1)
		_k.maxSimultaneousLights = 20
		switch (_m.t) {
			case `box`:
				_n = BABYLON.MeshBuilder.CreateBox(`mX${_u}`, {
					depth: _m.d,
					height: _m.h,
					width: _m.w
				}, _s)
				break
			case `cyl`:
				_n = BABYLON.MeshBuilder.CreateCylinder(`mX${_u}`, {
					diameterBottom: _m.l,
					diameterTop: _m.k,
					height: _m.h,
					subdivisions: _m.s
				}, _s)
				break
			case `sphr`:
				_n = BABYLON.MeshBuilder.CreateSphere(`mx${_u}`, {
					diameter: _m.j,
					segments: _m.s
				}, _s)
				break
		}
		// Rotation
		_n.rotation = new BABYLON.Vector3(_m.a, _m.b, _m.c)

		// Position
		if (_m.x) _n.position.x = _m.x
		if (_m.y) _n.position.y = _m.y
		if (_m.z) _n.position.z = _m.z

		// Scale
		if (_m.n) _n.scaling = new BABYLON.Vector3(_m.n, _m.n, _m.n)

		// Opacity
		if (_m.o) _n._visibility = _m.o
	})
})
