import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import Video from './components/Video';
import Controls from './components/Controls';
import Overlay from './components/Overlay';
import store from './store'


function mapStateToProps(state) {
  return {
  	crops: state.crops,
  }
}

const RdxVideo = connect(mapStateToProps)(Video);

var React = require('react');
var ReactDOM = require('react-dom');

function render_editor(poster="src/img/poster.png", vid_path="src/video/small.mp4") {
	ReactDOM.render(
		<RdxVideo autoPlay loop muted poster={poster} store={store}>
			<Overlay />
			<Controls />
			<source src={vid_path} type="video/mp4" />
		</RdxVideo>
		,
		document.getElementById('root')
	);
}

export {RdxVideo, Overlay, Controls, store, render_editor};