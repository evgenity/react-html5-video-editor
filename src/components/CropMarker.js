import interact from 'interact.js'

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

  componentDidMount() {
    function dragMoveListener (event) {
      var target = event.target;
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    window.dragMoveListener = dragMoveListener;
    if (this.props.isStart) {
      interact('.draggable_start')
      .draggable({
        inertia: true,
        restrict: {
          restriction: "parent",
          endOnly: false,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,
        onmove: dragMoveListener,
        onend: (event) => {
          var target = event.target;
          const x = parseFloat(target.getAttribute('data-x'))
          const start = x / 400 * 100;
          this.props.store.dispatch({type: 'CROPS_CHANGED', start: start});
        }
      })
    }
    else {
      interact('.draggable_end')
      .draggable({
        inertia: true,
        restrict: {
          restriction: "parent",
          endOnly: false,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,
        onmove: dragMoveListener,
        onend: (event) => {
          var target = event.target;
          const x = parseFloat(target.getAttribute('data-x'))
          const end = (400 + x) / 400 * 100;
          this.props.store.dispatch({type: 'CROPS_CHANGED', end: end});
        }
      })
    }
  },

  render() {
      return <div className="start_marker draggable_start" style={{left: this.props.position+"%"}} onend={function(e) {console.log(e)} }>I</div>
  }
})

export default CropMarker;