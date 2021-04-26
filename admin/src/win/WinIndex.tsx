import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { WinList } from "./WinList";
import { CreateWin } from "./CreateWin";
import { ViewWin } from "./ViewWin";

export const WinIndex = (): React.ReactElement => {
  useBreadcrumbs("/wins/", "Wins");

  return (
    <Switch>
      <PrivateRoute exact path={"/wins/"} component={WinList} />
      <PrivateRoute path={"/wins/new"} component={CreateWin} />
      <PrivateRoute path={"/wins/:id"} component={ViewWin} />
    </Switch>
  );
};
