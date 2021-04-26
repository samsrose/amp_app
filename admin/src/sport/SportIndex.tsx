import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { SportList } from "./SportList";
import { CreateSport } from "./CreateSport";
import { ViewSport } from "./ViewSport";

export const SportIndex = (): React.ReactElement => {
  useBreadcrumbs("/sports/", "Sports");

  return (
    <Switch>
      <PrivateRoute exact path={"/sports/"} component={SportList} />
      <PrivateRoute path={"/sports/new"} component={CreateSport} />
      <PrivateRoute path={"/sports/:id"} component={ViewSport} />
    </Switch>
  );
};
