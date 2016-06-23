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

		interact('.draggable')
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

		interact('.dropzone').dropzone({
		  // only accept elements matching this CSS selector
		  accept: '#yes-drop',
		  // Require a 75% element overlap for a drop to be possible
		  overlap: 0.75,

		  // listen for drop related events:

		  ondropactivate: function (event) {
		    // add active dropzone feedback
		    event.target.classList.add('drop-active');
		  },
		  ondragenter: function (event) {
		    var draggableElement = event.relatedTarget,
		        dropzoneElement = event.target;

		    // feedback the possibility of a drop
		    dropzoneElement.classList.add('drop-target');
		    draggableElement.classList.add('can-drop');
		    draggableElement.textContent = '';
		  },
		  ondragleave: function (event) {
		    // remove the drop feedback style
		    event.target.classList.remove('drop-target');
		    event.relatedTarget.classList.remove('can-drop');
		    event.relatedTarget.textContent = '';
		  },
		  ondrop: function (event) {
		    event.relatedTarget.textContent = '';
		  },
		  ondropdeactivate: function (event) {
		    // remove active dropzone feedback
		    event.target.classList.remove('drop-active');
		    event.target.classList.remove('drop-target');
		  }
		});
		})

