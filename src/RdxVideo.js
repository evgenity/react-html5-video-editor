import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import Video from './components/Video';
import Controls from './components/Controls';
import Overlay from './components/Overlay';


function mapStateToProps(state) {
  return {
  	crops: state.crops,
  }
}

const RdxVideo = connect(mapStateToProps)(Video);
const RdxControls = connect(mapStateToProps)(Controls);

export {RdxVideo as default, Overlay, Video, RdxControls};
