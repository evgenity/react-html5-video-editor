import {default as Video, Controls, Play, Seek, Time, Mute, Fullscreen} from 'react-html5video';
var React = require('react');
var ReactDOM = require('react-dom');

var Icon = React.createClass({

    propTypes: {
        name: React.PropTypes.oneOf([
            'play-1',
      'volume-off',
      'volume-down',
      'volume-up',
      'resize-full',
      'resize-small',
      'pause-1',
      'crop',
      'crop-begin',
      'crop-end',
        ])
    },

    /**
     * Default the icon to the first one just to show something
     * @return {Object} The default props
     */
    getDefaultProps() {
        return {
            name: 'play-1'
        };
    },

    render() {
        return (
            <span className={'video-icon video-icon--' + this.props.name}></span>
        );
    }

});

var Spinner = React.createClass({

    render() {
        return (
            <div className="video-spinner">
                <div className="video-spinner__rect1"></div>
                <div className="video-spinner__rect2"></div>
                <div className="video-spinner__rect3"></div>
                <div className="video-spinner__rect4"></div>
                <div className="video-spinner__rect5"></div>
            </div>
        );
    }

});

var Overlay1 = React.createClass({

    propTypes: {
        error: React.PropTypes.bool,
        togglePlay: React.PropTypes.func,
        paused: React.PropTypes.bool,
        copyKeys: React.PropTypes.object,
        loading: React.PropTypes.bool
    },

    renderContent() {
        var content;
        if (this.props.error) {
            content = (
                <div className="video-overlay__error">
                    <p className="video-overlay__error-text">{this.props.copyKeys.sourceError}</p>
                </div>
            );
        } else if (this.props.loading) {
            content = (
                <div className="video-overlay__loader">
                    <Spinner />
                </div>
            );
        } else {
            content = (<div className="video-overlay__play" onClick={this.props.togglePlay}>
                <div>
                    {this.props.paused ? <Icon name="crop-begin" /> : ''}
                </div>
                <div>
                    {this.props.paused ? <Icon name="crop-end" /> : ''}
                </div></div>
            );
        }
        return content;
    },

    render() {
        return (
            <div className="video-overlay">
                {this.renderContent()}
            </div>
        );
    }

});

var Crop = React.createClass({

    propTypes: {
    },

    /**
     * As controls receive all props for extensibility, we do a quick
     * check and make sure only the props we care about have changed.
     * @param  {object} nextProps The next props from parent
     * @return {boolean}          Whether we re-render or not
     */
    shouldComponentUpdate(nextProps) {
        return false;
    },

    render() {
        return (
          <div className="video-mute video__control" >
            <button
                className="video-mute__inner"
                onClick=""
                aria-label="aria-label">
                <Icon name='crop' />
            </button>
          </div>
        );
    }
});

ReactDOM.render(
  <Video controls autoPlay loop muted  poster="src/img/poster.png">
    <source src="src/video/small.mp4" type="video/mp4" />
    <Overlay1 />
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