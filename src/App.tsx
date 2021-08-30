import { Route, Switch } from 'react-router-dom';
import { ChatContainer } from 'containers';
import IndexContainer from 'containers/index/IndexContainer';
import AuthRouter from 'router/AuthRouter';
import VideoChatRouter from 'router/videoChatRouter';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ChatContainer} />
      <Route path="/index" exact component={IndexContainer} />
      <Route path="/auth" component={AuthRouter} />
      <VideoChatRouter />
    </Switch>
  );
}

export default App;
