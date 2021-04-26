import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Sport as TSport } from "../api/sport/Sport";

type Props = { id: string };

export const SportTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TSport,
    AxiosError,
    [string, string]
  >(["get-/api/sports", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/sports"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/sports"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
