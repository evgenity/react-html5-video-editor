import React from 'react';
import Overlay from './Overlay';
import Controls from './Controls';
import Seek from './Seek';
import Play from './Play';
import Time from './Time';

var VIDEO_EVENTS = [ 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting'];

var Video = React.createClass({

    propTypes: {
        children: React.PropTypes.node,
        autoPlay: React.PropTypes.bool,
        muted: React.PropTypes.bool,
        controls: React.PropTypes.bool,
        onTimeUpdate: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            onTimeUpdate: (e) => {
                // console.log(e)
                // console.log(this.videoEl)
            }
        }
    },

    getInitialState() {
        return {
            networkState: 0,
            paused: !this.props.autoPlay,
            muted: !!this.props.muted,
            volume: 1,
            error: false,
            loading: false,
        };
    },

    componentWillMount() {
        this._updateStateFromVideo =  () =>{this.updateStateFromVideo()};
        this.mediaEventProps = VIDEO_EVENTS.reduce((p, c) => {
            p[c] = (e) => {
                // console.log(e.type)
                if (c in this.props && typeof this.props[c] === 'function') {
                    this.props[c](e);
                }
                this._updateStateFromVideo();
                this.props.dispatch({type: 'VIDEO', e: e.type})
            };
            return p;
        }, {});
    },

    componentDidMount() {},

    componentWillUnmount() {},

    togglePlay() {
        if ( this.state.paused ) {  this.videoEl.play(); } else { this.videoEl.pause(); }
    },

    toggleMute() {
        if (this.state.muted) { this.videoEl.muted = false; } else { this.videoEl.muted = true; }
    },

    load() {
        this.videoEl.load();
    },

    seek(time) {
        this.videoEl.currentTime = time;
    },

    setVolume(volume) {
        this.videoEl.volume = volume;
    },

    updateStateFromVideo() {
        if (this.videoEl.currentTime  / this.videoEl.duration * 100 > this.props.crops[1]) {
            this.videoEl.currentTime = this.props.crops[0] / 100 * this.videoEl.duration;
        }
        this.setState({
            // Standard video properties
            duration: this.videoEl.duration,
            currentTime: this.videoEl.currentTime,
            buffered: this.videoEl.buffered,
            paused: this.videoEl.paused,
            muted: this.videoEl.muted,
            volume: this.videoEl.volume,
            readyState: this.videoEl.readyState,

            // Non-standard state computed from properties
            percentageBuffered: this.videoEl.buffered.length && this.videoEl.buffered.end(this.videoEl.buffered.length - 1) / this.videoEl.duration * 100,
            percentagePlayed: this.videoEl.currentTime / this.videoEl.duration * 100,
            error: this.videoEl.networkState === this.videoEl.NETWORK_NO_SOURCE,
            loading: this.videoEl.readyState < this.videoEl.HAVE_ENOUGH_DATA
        });
    },

    renderControls() {
        var extendedProps = Object.assign({
            // The public methods that all controls should be able to use.
            togglePlay: this.togglePlay,
            toggleMute: this.toggleMute,
            play: this.play,
            pause: this.pause,
            seek: this.seek,
            fullscreen: this.fullscreen,
            setVolume: this.setVolume
        }, this.state, this.props);

        var controls = React.Children.map(this.props.children, (child, i) => {
            if (child.type === 'source') { return; }
            return React.cloneElement(child, extendedProps);
        });
        return controls;
    },

    renderSources() {
        return React.Children.map(this.props.children, (child, i) => {
            if (child.type !== 'source') { return; }
            return child;
        });
    },

    getVideoClassName() {
        var classString = 'video';

        if (this.state.error) {
            classString += ' video--error';
        } else if (this.state.loading) {
            classString += ' video--loading';
        } else if (this.state.paused) {
            classString += ' video--paused';
        } else {
            classString += ' video--playing';
        }

        if (this.state.focused) {
            classString += ' video--focused';
        }
        return classString;
    },

    onFocus() {
        this.setState({
            focused: true
        });
    },

    render() {
        return (
            <div className={this.getVideoClassName()} tabIndex="0" onFocus={this.onFocus}>
                <video className="video__el" {...this.props} {...this.mediaEventProps} ref={(el) => { this.videoEl = el; }}>
                    {this.renderSources()}
                </video>
                {this.renderControls()}
            </div>
        );
    }
});

export {Video as default};
