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
        console.log(this.props.crops)
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
                        {this.props.crops.map(function(e) {
                                                    return <CropMarker position={e} />
                                                })}
                </div>
            </div>
        );
    }
});

export default Seek;