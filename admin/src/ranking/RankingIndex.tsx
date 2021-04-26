import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { RankingList } from "./RankingList";
import { CreateRanking } from "./CreateRanking";
import { ViewRanking } from "./ViewRanking";

export const RankingIndex = (): React.ReactElement => {
  useBreadcrumbs("/rankings/", "rankings");

  return (
    <Switch>
      <PrivateRoute exact path={"/rankings/"} component={RankingList} />
      <PrivateRoute path={"/rankings/new"} component={CreateRanking} />
      <PrivateRoute path={"/rankings/:id"} component={ViewRanking} />
    </Switch>
  );
};
