module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
	"proxy": {
		"/visitors": {
			"target": "http://localhost:3000/"
		},
		"/employees": {
			"target": "http://localhost:3000/"
		}
	}
},
}