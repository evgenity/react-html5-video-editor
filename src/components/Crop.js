import {default as Icon} from './Icon'

var React = require('react');

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

export default Crop;