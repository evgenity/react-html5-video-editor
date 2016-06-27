import {default as ProgressBar} from './ProgressBar'
import {default as CropMarker} from './CropMarker'

var React = require('react');

var Seek = React.createClass({

    propTypes: {
        seek: React.PropTypes.func,
        percentageBuffered: React.PropTypes.number,
        percentagePlayed: React.PropTypes.number,
        duration: React.PropTypes.number,
    },

    getInitialState() {
        return {
            focused: false
        };
    },

    shouldComponentUpdate(nextProps) {
      return true;
    },

    seek(e) {
        this.props.seek(e.target.value * this.props.duration / 100);
    },

    onFocus() {
        this.setState({
            focused: true
        });
    },

    render() {
        return (
            <div
                className={'video-seek video__control' + (this.state.focused
                    ? ' video__control--focused' : '')}>
                <div className="video-seek__container">
                    <div style={{
                        width: this.props.percentageBuffered + '%'
                    }} className="video-seek__buffer-bar">
                    </div>
                    <ProgressBar
                        onFocus={this.onFocus}
                        onChange={this.seek}
                        progress={this.props.percentagePlayed} />
                    <CropMarker store={this.props.store} isStart={true} position={this.props.cropStart} />
                    <CropMarker store={this.props.store} isStart={false} position={this.props.cropEnd} />
                </div>
            </div>
        );
    }
});

export default Seek;