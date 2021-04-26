import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Ranking as TRanking } from "../api/ranking/Ranking";

type Props = { id: string };

export const RankingTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TRanking,
    AxiosError,
    [string, string]
  >(["get-/api/rankings", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/rankings"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/rankings"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
