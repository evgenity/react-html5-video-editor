var React = require('react');

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

    render() {
        return (
            <span className={'video-icon video-icon--' + this.props.name}></span>
        );
    }

});

export default Icon;