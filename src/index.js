import {default as Video} from './components/Video';
import {default as Overlay} from './components/Overlay'
import {default as Controls} from './components/Controls'
import {default as Icon} from './components/Icon'
import {default as App, RdxControls} from './App'
import interact from 'interact.js'

import { Provider } from 'react-redux';
import store from './store';

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
	<Provider store={store}>
	<App autoPlay loop muted  poster="src/img/poster.png">
	<Overlay />
	<Controls />
	<source src="src/video/small.mp4" type="video/mp4" />
	</App>
	</Provider>
	,
	document.getElementById('root')
	);

document.addEventListener("DOMContentLoaded", function(event) {

	interact('.draggable_start')
	.draggable({
		inertia: true,
		restrict: {
			restriction: "parent",
			endOnly: false,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},
		autoScroll: true,
		onmove: dragMoveListener,
		onend: function (event) {
			var target = event.target;
			const start = (event.pageX - 48)/400 * 100;
			store.dispatch({type: 'CROPS_CHANGED', start: start});
		}
	})
	.restrict({
		drag: document.getElementById('video-progress-bar'),
	});

	interact('.draggable_end')
		.draggable({
		inertia: true,
		restrict: {
			restriction: "parent",
			endOnly: false,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},
		autoScroll: true,
		onmove: dragMoveListener,
		onend: function (event) {
			var target = event.target;
			const end = (event.pageX - 48)/400 *100;
			store.dispatch({type: 'CROPS_CHANGED', end: end});
		}
	})
	.restrict({
		drag: document.getElementById('video-progress-bar'),
	});


	function dragMoveListener (event) {
		var target = event.target;
		var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
		var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}

	window.dragMoveListener = dragMoveListener;

})

