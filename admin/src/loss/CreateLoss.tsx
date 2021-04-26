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
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Loss as TLoss } from "../api/loss/Loss";
import { LossCreateInput } from "../api/loss/LossCreateInput";

const INITIAL_VALUES = {} as LossCreateInput;

export const CreateLoss = (): React.ReactElement => {
  useBreadcrumbs("/losses/new", "Create Loss");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TLoss,
    AxiosError,
    LossCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/losses", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/losses"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: LossCreateInput) => {
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
            <FormHeader title={"Create Loss"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField
              type="number"
              step={1}
              label="loss_number"
              name="lossNumber"
            />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
