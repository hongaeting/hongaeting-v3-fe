import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import TopBar from 'component/common/TopBar';
import DefaultContainer from 'component/common/container/DefaultContainer';
import EmailFormContainer from 'containers/auth/EmailFormContainer';
import EmailReceiveContainer from 'containers/auth/EmailReceiveContainer';
import EmailCompleteContainer from 'containers/auth/EmailCompleteContainer';
import SignInFormContainer from 'containers/auth/SignInFormContainer';

export default function AuthRouter() {
  return (
    <Grid>
      <TopBar />
      <Switch>
        <DefaultContainer maxWidth="sm">
          <Route
            exact
            path="/auth/signup/form"
            component={EmailFormContainer}
          />
          <Route
            exact
            path="/auth/signup/receive"
            component={EmailReceiveContainer}
          />
          <Route
            exact
            path="/auth/signup/complete"
            component={EmailCompleteContainer}
          />
          <Route
            exact
            path="/auth/signin/form"
            component={SignInFormContainer}
          />
          <Route
            exact
            path="/auth/signin/complete"
            component={SignInFormContainer}
          />
        </DefaultContainer>
      </Switch>
    </Grid>
  );
}
