import {default as Video, Controls, Overlay, Play, Seek, Time, Mute, Fullscreen} from 'react-html5video';
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <Video controls autoPlay loop muted  poster="src/img/poster.png">
    <source src="src/video/small.mp4" type="video/mp4" />
    <Overlay />
    <Controls>
      <Play />
      <Seek />
      <Time />
      <Mute />
    </Controls>
  </Video>
  ,
  document.getElementById('example')
);
