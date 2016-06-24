# react-html5-video-editor

React video element with a crop marker. Moving crop markers emits Redux actions.

![preview](img/crop-preview.png)
<!--[demo](https://github.com/)-->

## Features:
 - simple & clean
 - enhanced video previews
 - video crop
 - effect composer
 - numerous formats support
 - customizable
Do not hesitate to post an issue to request features.

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
    <div id="example"></div>
    <script src="build/bundle.dist.js"></script>
 </body>
```

```javascript
ReactDOM.render(
  <Video controls autoPlay loop muted  poster="src/img/poster.png">
    <source src="src/video/small.mp4" type="video/mp4" />
    <Overlay />
    <Controls />
  </Video>
  ,
  document.getElementById('example')
);
```

### Configuration
```javascript
Video.Props = {
	autoPlay: false,
	loop: false,
	controls:	true,
	volume:	1.0,
	preload: "auto",
	cropEnabled: true;
}
```

## License
GNU GPLv3
