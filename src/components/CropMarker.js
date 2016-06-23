var React = require('react');

var CropMarker = React.createClass({
    propTypes: {
      position: React.PropTypes.number,
      isStart: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {

        };
    },

    render() {
      if (this.props.isStart) {
        return <div className="start_marker draggable" style={{left: "0%"}}/>
      }
      else {
        return <div className="end_marker draggable" style={{left: "98%"}}/>
      }
    }
})

export default CropMarker;