import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Ranking as TRanking } from "../api/ranking/Ranking";
import { RankingUpdateInput } from "../api/ranking/RankingUpdateInput";

export const ViewRanking = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/rankings/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TRanking,
    AxiosError,
    [string, string]
  >(["get-/api/rankings", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/rankings"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TRanking, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/rankings"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//rankings");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TRanking, AxiosError, RankingUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/rankings"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: RankingUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, []), [data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"ranking"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          ></Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
