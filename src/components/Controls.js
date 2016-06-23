import {default as Time} from './Time'
import {default as Play} from './Play'
import {default as Seek} from './Seek'


var React = require('react');

var Controls = React.createClass({
    getInitialState: function() {
      return {
      };
    },
  

    render: function() {
        var children = [
              <Play />,
              <Seek />,
              <Time />,
        ]
        return (
                <div className="video-controls video__controls">
                    {children.map((child, i) => {
                        return React.cloneElement(child, {...this.props, key: i});
                      })}
                </div>
        );
    }
});

export default Controls;