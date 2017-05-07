import App from './App';
import { connect } from 'react-redux';
import * as actions from './action';

const AppContainer = connect(
  state => state,

  actions
)(App);

export default AppContainer;
