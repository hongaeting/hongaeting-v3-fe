import { Route, Switch } from 'react-router-dom';
import TopBar from 'component/common/TopBar';
import DefaultContainer from 'component/common/container/DefaultContainer';
import { Grid } from '@material-ui/core';
import EmailFormContainer from '../containers/auth/EmailFormContainer';

export default function AuthRouter() {
  return (
    <Grid>
      <TopBar />
      <Switch>
        <DefaultContainer maxWidth="sm">
          <Route
            exact
            path="/auth/signup/email"
            component={EmailFormContainer}
          />
          <Route exact path="/auth/signup/verify" />
          <Route exact path="/auth/signup/complete" />
          <Route exact path="/auth/signin" />
        </DefaultContainer>
      </Switch>
    </Grid>
  );
}
