import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import TopBar from 'component/common/TopBar';
import DefaultContainer from 'component/common/container/DefaultContainer';
import CallReadyContainer from 'containers/call/CallReadyContainer';
import CallMakeContainer from 'containers/call/CallMakeContainer';
import CallReceiveContainer from 'containers/call/CallReceiveContainer';

export default function CallRouter() {
  return (
    <Grid>
      <TopBar />
      <Switch>
        <DefaultContainer maxWidth="sm">
          <Route exact path="/call/ready" component={CallReadyContainer} />
          <Route exact path="/call/make" component={CallMakeContainer} />
          <Route exact path="/call/receive" component={CallReceiveContainer} />
        </DefaultContainer>
      </Switch>
    </Grid>
  );
}
