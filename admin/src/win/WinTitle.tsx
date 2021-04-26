import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Win as TWin } from "../api/win/Win";

type Props = { id: string };

export const WinTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TWin,
    AxiosError,
    [string, string]
  >(["get-/api/wins", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/wins"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/wins"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
