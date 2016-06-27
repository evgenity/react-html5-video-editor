import {default as Video} from './components/Video';
import {default as Overlay} from './components/Overlay'
import {default as Controls} from './components/Controls'
import {default as RdxVideo} from './RdxVideo'

import store from './store';

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
	<RdxVideo autoPlay loop muted poster="src/img/poster.png" store={store}>
		<Overlay />
		<RdxControls />
		<source src="src/video/small.mp4" type="video/mp4" />
	</RdxVideo>
	,
	document.getElementById('root')
);