import { createStore, combineReducers } from 'redux'
import { app } from '../modules'

const storeOptions = [
	combineReducers({ app }),
	{}
]

// Enable Redux DevTools if installed and running locally
if (window.location.hostname === 'localhost') {
	storeOptions.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

const store = createStore(...storeOptions)

export default store