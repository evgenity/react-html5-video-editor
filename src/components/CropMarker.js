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
        return <div className="start_marker draggable_start" style={{left: "0%"}} onend={function(e) {console.log(e)} }/>
      }
      else {
        return <div className="end_marker draggable_end" style={{left: "98%"}}/>
      }
    }
})

export default CropMarker;