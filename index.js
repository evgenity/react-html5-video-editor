import {default as Video, Play, Time, Mute, Fullscreen} from 'react-html5video';
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

var Overlay = React.createClass({

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
                    {this.props.paused ? <Icon name="play-1" /> : ''}
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
      isStart: React.PropTypes.bool,
      onClick: React.PropTypes.func,
    },

    /**
     * As controls receive all props for extensibility, we do a quick
     * check and make sure only the props we care about have changed.
     * @param  {object} nextProps The next props from parent
     * @return {boolean}          Whether we re-render or not
     */
    shouldComponentUpdate(nextProps) {
        return true;
    },

    render() {
        return (
          <div className="video-crop video__control" >
            <button
                className="video-crop__inner"
                onClick={()=>{this.props.onClick(this.props.isStart)}}
                aria-label="aria-label">
                <Icon name={this.props.isStart ? 'crop-begin' : 'crop-end'} />
            </button>
          </div>
        );
    }
});

var Seek = React.createClass({

    propTypes: {
        copyKeys: React.PropTypes.object,
        seek: React.PropTypes.func,
        percentageBuffered: React.PropTypes.number,
        percentagePlayed: React.PropTypes.number,
        duration: React.PropTypes.number,
        cropBegin: React.PropTypes.number,
        cropEnd: React.PropTypes.number,
    },

    getInitialState() {
        return {
            // When the child range input becomes focused,
            // we need to set this custom seek bar to look
            // 'focused' with the correct styles. Need to
            // do this via a class.
            focused: false
        };
    },

    /**
     * As controls receive all props for extensibility, we do a quick
     * check and make sure only the props we care about have changed.
     * @param  {object} nextProps The next props from parent
     * @return {boolean}          Whether we re-render or not
     */
    shouldComponentUpdate(nextProps) {
      return true;
        return this.props.seek !== nextProps.seek ||
               this.props.percentageBuffered !== nextProps.percentageBuffered ||
               this.props.percentagePlayed !== nextProps.percentagePlayed ||
               this.props.duration !== nextProps.duration;
    },

    /**
     * Calculates the seek time based on change of input.
     * @param  {object} e Event object
     * @return {undefined}
     */
    seek(e) {
        this.props.seek(e.target.value * this.props.duration / 100);
    },

    onFocus() {
        this.setState({
            focused: true
        });
    },

    onBlur() {
        this.setState({
            focused: false
        });
    },

    render() {
        return (
            <div
                className={'video-seek video__control' + (this.state.focused
                    ? ' video__control--focused' : '')}
                aria-label={this.props.copyKeys.seek}>
                <div className="video-seek__container">
                    <div style={{
                        width: this.props.percentageBuffered + '%'
                    }} className="video-seek__buffer-bar">
                    </div>
                    <ProgressBar
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChange={this.seek}
                        progress={this.props.percentagePlayed} 
                        cropStart={this.props.cropBegin}
                        cropEnd={this.props.cropEnd} />
                </div>
            </div>
        );
    }
});

var CropMarker = React.createClass({
    propTypes: {
      position: React.PropTypes.number,
      isStart: React.PropTypes.bool,
    },

    render() {
      if (this.props.isStart) {
        return <div className="start_marker" style={{left: this.props.position + "%"}}/>
      }
      else {
        return <div className="end_marker" style={{left: this.props.position + "%"}}/>
      }
    }
})

var ProgressBar = React.createClass({

    propTypes: {
        orientation: React.PropTypes.string,
        step: React.PropTypes.number,
        progress: React.PropTypes.number,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        cropStart: React.PropTypes.number,
        cropEnd: React.PropTypes.number,
    },

    shouldComponentUpdate(nextProps) {
      return true;
        return this.props.progress !== nextProps.progress;
    },

    getInitialState() {
      return {
        cropBegin: 10,
        cropEnd: 40,
      };
    },

    getDefaultProps() {
        return {
            orientation: 'horizontal',
            step: 0.1,
            progress: 0,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            cropStart: 10,
            cropEnd: 20,
        };
    },

    componentDidMount() {
        // 'orient' is not supported by React but
        // is required for Firefox. Setting manually.
        // https://github.com/facebook/react/issues/2453
        this.refs.input.setAttribute('orient', this.props.orientation);
    },

    onChange(e) {
      console.log(e.target.value)
        this.props.onChange(e);
    },

    onFocus() {
        // Placeholder
    },

    onBlur() {
        // Placeholder
    },

    render() {
        return (
            <div className={'video-progress-bar ' + (this.props.orientation === 'horizontal'
                ? 'video-progress-bar--horizontal' : 'video-progress-bar--vertical')}>
                <div className="video-progress-bar__fill" style={{
                    [this.props.orientation === 'horizontal' ? 'width' : 'height']: this.props.progress + '%'
                }} />
                <input className="video-progress-bar__input"
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    ref="input"
                    onChange={this.onChange}
                    type="range"
                    min="0"
                    max="100"
                    value={this.props.progress}
                    step={this.props.step} />
                <CropMarker isStart={true} position={this.props.cropStart} />
                <CropMarker isStart={false} position={this.props.cropEnd} />
            </div>
        );
    }
});

var Controls = React.createClass({
    getInitialState: function() {
      return {
        cropBegin: 0,
        cropEnd: 98
      };
    },

    propTypes: {
        error: React.PropTypes.bool,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ])
    },
    onCropClicked: function(isStart) {
      const played = this.props.percentagePlayed;
      if (isStart) {
        this.setState({cropBegin: played > this.state.cropEnd ? this.state.cropEnd : played});
      }
      else {
        this.setState({cropEnd: (played < this.state.cropBegin ? this.state.cropBegin : played) - 2});
      }
    },
    getDefaultProps() {
        return {
            children: [
              <Play />,
              <Seek />,
              <Time />,
              <Mute />,
            ]
        };
    },

    /**
     * Returns children components with props
     * from the parent Video component. Needed
     * for when custom React components are used.
     * @return {Array.<ReactElement>} An array of components.
     */
    renderChildren: function() {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {...this.props});
        });
    },

    renderDefaultChildren: function() {
        var children = [
              <Play />,
              <Seek cropBegin={this.state.cropBegin} cropEnd={this.state.cropEnd}/>,
              <Time />,
              <Mute />,
              <Crop isStart={true} onClick={this.onCropClicked} />,
              <Crop isStart={false} onClick={this.onCropClicked} />
            ]
        return React.Children.map(children, child => {
            return React.cloneElement(child, {...this.props});
        });
    },

    render: function() {
        return (
            !this.props.error ? (
                <div className="video-controls video__controls">
                    {this.renderDefaultChildren()}
                </div>
            ) : null
        );
    }
});

ReactDOM.render(
  <Video controls autoPlay loop muted  poster="src/img/poster.png">
    <source src="src/video/small.mp4" type="video/mp4" />
    <Overlay />
    <Controls />
  </Video>
  ,
  document.getElementById('example')
);