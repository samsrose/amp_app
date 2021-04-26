import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Ranking as TRanking } from "../api/ranking/Ranking";
import { RankingCreateInput } from "../api/ranking/RankingCreateInput";

const INITIAL_VALUES = {} as RankingCreateInput;

export const CreateRanking = (): React.ReactElement => {
  useBreadcrumbs("/rankings/new", "Create ranking");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TRanking,
    AxiosError,
    RankingCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/rankings", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/rankings"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: RankingCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create ranking"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
