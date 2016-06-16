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
```javascript
import Video from 'react-html5-video-editor';
render() {
    return (
        <Video controls autoPlay loop muted
            poster="http://poster.png"
            <source src="static/example.webm" type="video/webm" />
        </Video>
    );
}
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
