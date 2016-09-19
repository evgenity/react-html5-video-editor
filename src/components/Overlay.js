import {default as Icon} from './Icon'
import {default as Spinner} from './Spinner'

var React = require('react');

var Overlay = React.createClass({

    propTypes: {
        error: React.PropTypes.bool,
        togglePlay: React.PropTypes.func,
        paused: React.PropTypes.bool,
        loading: React.PropTypes.bool
    },

    renderContent() {
        var content;
        if (this.props.error) {
            content = (
                <div className="video-overlay__error">
                    <p className="video-overlay__error-text">{this.props.error}</p>
                </div>
            );
        } else if (this.props.loading) {
            content = (
                <div className="video-overlay__loader">
                    <Spinner />
                </div>
            );
        } else {
            content = (
                <div>            
                    <div className="video-overlay__pic" onClick={() => {if (!this.props.paused) {this.props.togglePlay();} else {this.props.store.dispatch({type: 'IMG_INSERT', position: this.props.percentagePlayed})}}}>
                            {this.props.paused ? <Icon name="pic" onClick={() => {this.props.togglePlay();}} /> : ''}
                    </div>
                </div>
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

export default Overlay;
