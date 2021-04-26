import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { LossList } from "./LossList";
import { CreateLoss } from "./CreateLoss";
import { ViewLoss } from "./ViewLoss";

export const LossIndex = (): React.ReactElement => {
  useBreadcrumbs("/losses/", "Losses");

  return (
    <Switch>
      <PrivateRoute exact path={"/losses/"} component={LossList} />
      <PrivateRoute path={"/losses/new"} component={CreateLoss} />
      <PrivateRoute path={"/losses/:id"} component={ViewLoss} />
    </Switch>
  );
};
