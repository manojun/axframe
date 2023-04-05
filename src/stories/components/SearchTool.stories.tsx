import { Button, Form } from "antd";
import * as React from "react";
import { ComponentMeta } from "@storybook/react";
import { SearchParams, SearchParamType } from "@core/components/search";
import { useI18n } from "hooks";

export default {
  title: "template/components/SearchParams",
  component: SearchParams,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SearchParams>;

export const Default = () => {
  const [form] = Form.useForm();
  return <SearchParams form={form} />;
};

export const ParamObjects = () => {
  const { t } = useI18n();
  const [form] = Form.useForm();
  return (
    <SearchParams
      form={form}
      params={[
        {
          label: t.pages.example.form.area.label,
          name: "select1",
          type: SearchParamType.SELECT,
          options: t.pages.example.form.area.options,
        },
        {
          label: t.pages.example.form.cnsltHow.label,
          name: "select2",
          type: SearchParamType.SELECT,
          options: t.pages.example.form.cnsltHow.options,
        },
        {
          label: t.pages.example.form.cnsltDt.label,
          name: "timeRange",
          type: SearchParamType.TIME_RANGE,
        },
      ]}
    />
  );
};

export const ExtraButtons = () => {
  const { t } = useI18n();
  const [form] = Form.useForm();
  return (
    <SearchParams
      form={form}
      params={[
        {
          label: "S1",
          name: "select1",
          type: SearchParamType.SELECT,
          options: t.pages.example.form.area.options,
        },
        {
          label: "S2",
          name: "select2",
          type: SearchParamType.SELECT,
          options: t.pages.example.form.cnsltHow.options,
        },
      ]}
      extraButtons={() => (
        <>
          <Button>BTN1</Button>
          <Button>BTN2</Button>
        </>
      )}
    >
      Children
    </SearchParams>
  );
};
