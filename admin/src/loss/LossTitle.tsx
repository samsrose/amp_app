import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Loss as TLoss } from "../api/loss/Loss";

type Props = { id: string };

export const LossTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TLoss,
    AxiosError,
    [string, string]
  >(["get-/api/losses", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/losses"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/losses"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
