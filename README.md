# react-html5-video-editor

[Work in progress]
post an issue to request features 

![preview](img/crop-preview.png)
<!--[demo](https://github.com/)-->

## Features:
 - simple & clean
 - enhanced video previews
 - video crop
 - effect composer
 - numerous formats support
 - customizable

## Roadmap
 - video crop
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
    <Controls>
      <Play />
      <Seek />
      <Time />
      <Mute />
      <Crop />
    </Controls>
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
