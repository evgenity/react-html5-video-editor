# react-html5-video-editor

React / redux video element with a crop marker. Crop markers emit Redux actions when dragged.

![preview](img/crop-preview.png)
<!--[demo](https://github.com/)-->

## Features:
 - simple & clean
 - video crop
 - effect composer
 - numerous formats support
 - customizable
 
Do not hesitate to post an issue to request a feature (seriously).

## Roadmap
 - enhanced video previews
 - effect composer
 - multiple tracks

## Quickstart
### Install
```
npm install --save react-html5-video-editor
```

### Basic usage
```html
<body>
    <div id="root"></div>
    <script src="build/bundle.dist.js"></script>
 </body>
```

```javascript
ReactDOM.render(
  <Video controls autoPlay loop muted  poster="src/img/poster.png">
    <source src="src/video/small.mp4" type="video/mp4" />
  </Video>
  ,
  document.getElementById('root')
);
```

### Configuration
```javascript
Video.Props = {
	autoPlay: false,
	loop: false,
	controls: true,
	volume:	1.0,
	preload: "auto",
	cropEnabled: true;
}
```

## License
Code released under [GNU GPLv3](https://github.com/evgenity/react-html5-video-editor/blob/master/LICENSE.txt)
