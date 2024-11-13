import React, { forwardRef } from 'react';
import {
  Button,
  type ButtonProps,
  Checkbox,
  type CheckboxProps,
  ColorPicker,
  type ColorPickerProps,
  DatePicker,
  type DatePickerProps,
  Form,
  type FormInstance,
  type FormItemProps,
  type FormProps,
  Input,
  InputNumber,
  type InputNumberProps,
  type InputProps,
  Radio,
  type RadioProps,
  Segmented,
  type SegmentedProps,
  Select,
  type SelectProps,
  Slider,
  type SliderSingleProps,
  Switch,
  type SwitchProps,
  TimePicker,
  type TimePickerProps,
  Upload,
  type UploadProps,
} from 'antd';
import type { MonthPickerProps, RangePickerProps, WeekPickerProps } from 'antd/es/date-picker';
import type { PasswordProps, SearchProps, TextAreaProps } from 'antd/es/input';

import Email, { type EmailProps } from '../email';

export type CustomFormFieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'radio'
  | 'checkbox'
  | 'password'
  | 'email'
  | 'select'
  | 'date'
  | 'time'
  | 'week'
  | 'month'
  | 'year'
  | 'quarter'
  | 'range'
  | 'color'
  | 'textarea'
  | 'upload'
  | 'slider'
  | 'segmented'
  | 'search'
  | 'custom';

export interface CustomFormFieldConfig<
  T extends CustomFormFieldType,
  C extends Record<string, unknown>,
> extends FormItemProps {
  type?: T;
  component?: T extends 'custom' ? React.ComponentType : never;
  props?: T extends 'password'
    ? PasswordProps
    : T extends 'email'
      ? EmailProps
      : T extends 'select'
        ? SelectProps
        : T extends 'number'
          ? InputNumberProps
          : T extends 'boolean'
            ? SwitchProps
            : T extends 'radio'
              ? RadioProps
              : T extends 'checkbox'
                ? CheckboxProps
                : T extends 'date'
                  ? DatePickerProps
                  : T extends 'time'
                    ? TimePickerProps
                    : T extends 'week'
                      ? WeekPickerProps
                      : T extends 'month'
                        ? MonthPickerProps
                        : T extends 'year'
                          ? MonthPickerProps
                          : T extends 'quarter'
                            ? MonthPickerProps
                            : T extends 'range'
                              ? RangePickerProps
                              : T extends 'color'
                                ? ColorPickerProps
                                : T extends 'textarea'
                                  ? TextAreaProps
                                  : T extends 'upload'
                                    ? UploadProps
                                    : T extends 'slider'
                                      ? SliderSingleProps
                                      : T extends 'segmented'
                                        ? SegmentedProps
                                        : T extends 'search'
                                          ? SearchProps
                                          : T extends 'custom'
                                            ? C
                                            : InputProps;
}
export interface CustomFormConfig {
  [field: string]: CustomFormFieldConfig<CustomFormFieldType, Record<string, unknown>>;
}
export interface Submitter extends FormItemProps {
  submitText?: React.ReactNode;
  resetText?: React.ReactNode;
  resetProps?: Omit<ButtonProps, 'children'>;
  submitProps?: Omit<ButtonProps, 'children'>;
  render?: (doms: React.ReactNode[]) => React.ReactNode;
}
export interface CustomFormProps extends FormProps {
  config: CustomFormConfig;
  form?: FormInstance;
  loading?: boolean;
  disabled?: boolean;
  submitter?: false | Submitter;
}

const fieldComponents: Record<Exclude<CustomFormFieldType, 'custom'>, React.ComponentType> = {
  string: Input,
  search: Input.Search,
  password: Input.Password,
  email: Email,
  number: InputNumber,
  boolean: Switch,
  radio: Radio,
  checkbox: Checkbox,
  select: Select,
  date: DatePicker,
  time: TimePicker,
  week: DatePicker.WeekPicker,
  month: DatePicker.MonthPicker,
  year: DatePicker.YearPicker,
  quarter: DatePicker.QuarterPicker,
  range: DatePicker.RangePicker,
  color: ColorPicker,
  textarea: Input.TextArea,
  upload: Upload,
  slider: Slider,
  segmented: Segmented as React.ComponentType,
};

const CustomForm = (
  {
    config,
    layout = 'horizontal',
    loading = false,
    disabled = false,
    submitter = {},
    ...formProps
  }: CustomFormProps,
  ref: React.Ref<FormInstance>,
) => {
  const renderField = (
    field: string,
    conf: CustomFormFieldConfig<CustomFormFieldType, Record<string, unknown>>,
  ) => {
    const {
      type = 'string',
      label,
      props = {},
      labelCol = { span: 6 },
      wrapperCol = { span: 18 },
      component,
      ...rest
    } = conf;
    const itemProps = layout === 'horizontal' ? { labelCol, wrapperCol } : {};
    const fieldProps = props as InputProps;

    if (['checkbox', 'boolean'].includes(type)) {
      rest.valuePropName = 'checked';
    }
    if (type !== 'radio' && type !== 'checkbox' && type !== 'boolean') {
      if (fieldProps.allowClear === void 0) {
        fieldProps.allowClear = true;
      }
      if (!fieldProps.placeholder) {
        switch (type) {
          case 'email':
          case 'string':
          case 'password':
          case 'number':
            fieldProps.placeholder = `请输入${label}`;
            break;
          case 'select':
            fieldProps.placeholder = `请选择${label}`;
            break;
          default:
            break;
        }
      }
    }
    const FieldComponent =
      type === 'custom' ? (component as React.ComponentType) : fieldComponents[type] || Input;

    return (
      <Form.Item key={field} name={field} label={label} {...itemProps} {...rest}>
        <FieldComponent {...fieldProps} />
      </Form.Item>
    );
  };
  const renderSubmitter = (submitter: Submitter) => {
    const {
      submitText = '提交',
      resetText = '重置',
      resetProps,
      submitProps,
      render,
      ...rest
    } = submitter;
    const doms = [
      resetText && (
        <Button key="reset" htmlType="reset" disabled={loading} {...resetProps}>
          {resetText}
        </Button>
      ),
      submitText && (
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={disabled}
          {...submitProps}
        >
          {submitText}
        </Button>
      ),
    ];

    return <Form.Item {...rest}>{render ? render(doms) : doms}</Form.Item>;
  };

  return (
    <Form ref={ref} disabled={disabled} layout={layout} {...formProps}>
      {Object.entries(config).map(([field, conf]) => renderField(field, conf))}
      {submitter && renderSubmitter(submitter)}
    </Form>
  );
};

export default forwardRef(CustomForm);
