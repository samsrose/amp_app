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
import { Win as TWin } from "../api/win/Win";
import { WinCreateInput } from "../api/win/WinCreateInput";

const INITIAL_VALUES = {} as WinCreateInput;

export const CreateWin = (): React.ReactElement => {
  useBreadcrumbs("/wins/new", "Create Win");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TWin,
    AxiosError,
    WinCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/wins", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/wins"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: WinCreateInput) => {
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
            <FormHeader title={"Create Win"}>
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
