import store from './store';
import {RdxVideo, Controls, Overlay} from './RdxVideo'
import { Provider } from 'react-redux'

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
	<RdxVideo autoPlay loop muted poster="src/img/poster.png" store={store}>
		<Overlay />
		<Controls />
		<source src="src/video/small.mp4" type="video/mp4" />
	</RdxVideo>
	,
	document.getElementById('root')
);