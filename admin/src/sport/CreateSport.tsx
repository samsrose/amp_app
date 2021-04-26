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
import { Sport as TSport } from "../api/sport/Sport";
import { SportCreateInput } from "../api/sport/SportCreateInput";

const INITIAL_VALUES = {} as SportCreateInput;

export const CreateSport = (): React.ReactElement => {
  useBreadcrumbs("/sports/new", "Create Sport");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TSport,
    AxiosError,
    SportCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/sports", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/sports"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: SportCreateInput) => {
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
            <FormHeader title={"Create Sport"}>
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
