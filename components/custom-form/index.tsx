import React, { forwardRef, useCallback } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  type AutoCompleteProps,
  Button,
  type ButtonProps,
  Cascader,
  type CascaderProps,
  Checkbox,
  type CheckboxProps,
  Col,
  ColorPicker,
  type ColorPickerProps,
  type ColProps,
  DatePicker,
  type DatePickerProps,
  Form,
  type FormInstance,
  type FormItemProps,
  type FormListFieldData,
  type FormListOperation,
  type FormProps,
  Input,
  InputNumber,
  type InputNumberProps,
  type InputProps,
  Radio,
  type RadioProps,
  Row,
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
import type { ValidatorRule } from 'rc-field-form/lib/interface';

import Email, { type EmailProps } from '../email';

import './index.global.less';

type CustomFormFieldType =
  | 'autoComplete'
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
  | 'cascader'
  | 'list'
  | 'custom';

type FieldProps<
  T extends CustomFormFieldType,
  C extends Record<string, unknown>,
> = T extends 'password'
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
                                        : T extends 'autoComplete'
                                          ? AutoCompleteProps
                                          : T extends 'cascader'
                                            ? CascaderProps
                                            : T extends 'custom'
                                              ? C
                                              : InputProps;
interface ListConfig extends CustomFormConfig {
  [field: string]: CustomFormFieldConfig<CustomFormFieldType, Record<string, unknown>>;
}
interface CustomFormFieldConfig<T extends CustomFormFieldType, C extends Record<string, unknown>>
  extends FormItemProps {
  type?: T;
  component?: T extends 'custom' ? React.ComponentType : never;
  props?: FieldProps<T, C>;
  colProps?: Omit<ColProps, 'children'>;
  config?: T extends 'list' ? ListConfig : never;
  maxLength?: T extends 'list' ? number : never;
  minLength?: T extends 'list' ? number : never;
  addText?: T extends 'list' ? string : never;
  addProps?: T extends 'list' ? Omit<ButtonProps, 'onClick' | 'children'> : never;
  onAdd?: T extends 'list'
    ? (fields: FormListFieldData[], add: FormListOperation['add']) => void
    : never;
  removeProps?: T extends 'list' ? Omit<ButtonProps, 'onClick' | 'children'> : never;
  removeText?: T extends 'list' ? string : never;
  onRemove?: T extends 'list'
    ? (field: FormListFieldData, remove: FormListOperation['remove']) => void
    : never;
}
interface CustomFormConfig {
  [field: string]: CustomFormFieldConfig<CustomFormFieldType, Record<string, unknown>>;
}
interface Submitter extends FormItemProps {
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

const fieldComponents: Record<
  Exclude<CustomFormFieldType, 'custom' | 'list'>,
  React.ComponentType
> = {
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
  segmented: Segmented as React.FC,
  autoComplete: AutoComplete,
  cascader: Cascader,
};

interface AddButtonProps extends Omit<ButtonProps, 'onClick'> {
  fields: FormListFieldData[];
  add: FormListOperation['add'];
  onAdd?(field: FormListFieldData[], add: FormListOperation['add']): void;
}
const AddButton: React.FC<AddButtonProps> = ({ children, fields, add, onAdd, ...props }) => {
  const handleClick = useCallback(() => {
    if (onAdd) {
      onAdd(fields, add);
    } else {
      add();
    }
  }, [fields, add, onAdd]);

  return (
    <Button type="dashed" block icon={<PlusOutlined />} {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};

interface RemoveButtonProps extends Omit<ButtonProps, 'onClick'> {
  field: FormListFieldData;
  remove: FormListOperation['remove'];
  onRemove?(field: FormListFieldData, remove: FormListOperation['remove']): void;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({
  children,
  field,
  remove,
  onRemove,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (onRemove) {
      onRemove(field, remove);
    } else {
      remove(field.name);
    }
  }, [field, remove, onRemove]);

  return (
    <Button
      size="small"
      shape="circle"
      type="text"
      danger
      icon={<CloseOutlined />}
      {...props}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
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
    field: string | number | (string | number)[],
    conf: CustomFormFieldConfig<CustomFormFieldType, Record<string, unknown>>,
  ) => {
    const {
      type = 'string',
      label,
      props = {},
      component,
      maxLength = Infinity,
      minLength = 0,
      config: listConfig = {},
      colProps,
      prefixCls,
      removeProps,
      removeText,
      onRemove,
      addProps,
      addText = '添加项目',
      onAdd,
      rules,
      ...rest
    } = conf;
    const name = conf.name || field;
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
            fieldProps.placeholder = `请输入${label || ''}`;
            break;
          case 'select':
            fieldProps.placeholder = `请选择${label || ''}`;
            break;
          default:
            break;
        }
      }
    }
    let FieldComponent: React.ReactElement;

    if (type === 'custom') {
      const Rc = component as React.ComponentType;

      FieldComponent = (
        <Form.Item key={name} name={name} label={label} rules={rules} {...rest}>
          <Rc {...fieldProps} />
        </Form.Item>
      );
    } else if (type === 'list') {
      const fieldIsString = !Object.keys(listConfig).length;

      FieldComponent = (
        <Form.List
          key={field as string}
          name={name}
          prefixCls={prefixCls}
          rules={rules as ValidatorRule[]}
          initialValue={rest.initialValue}
        >
          {(fields, opt, { errors }) => {
            return (
              <Form.Item label={label} {...rest}>
                {fields.map((field, i) => {
                  const Remove = ({ style }: { style?: React.CSSProperties }) => (
                    <RemoveButton
                      field={field}
                      remove={opt.remove}
                      onRemove={onRemove}
                      disabled={fields.length <= minLength}
                      {...removeProps}
                      style={{
                        ...style,
                        ...removeProps?.style,
                      }}
                    >
                      {removeText}
                    </RemoveButton>
                  );

                  return (
                    <div key={field.name + i} className="custom-form-list-item">
                      <Row gutter={24} className="custom-form-list-item-content">
                        {fieldIsString
                          ? renderField(field.name, listConfig)
                          : Object.entries(listConfig).map(([key, c]) =>
                              renderField([field.name, key], c),
                            )}
                      </Row>
                      <Remove />
                    </div>
                  );
                })}
                <AddButton
                  fields={fields}
                  add={opt.add}
                  onAdd={onAdd}
                  {...addProps}
                  disabled={addProps?.disabled || fields.length >= (maxLength || Infinity)}
                >
                  {addText}
                </AddButton>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            );
          }}
        </Form.List>
      );
    } else {
      const Rc = fieldComponents[type];

      FieldComponent = (
        <Form.Item key={name} name={name} label={label} rules={rules} {...rest}>
          <Rc {...fieldProps} />
        </Form.Item>
      );
    }

    return (
      <Col key={name} {...colProps}>
        {FieldComponent}
      </Col>
    );
  };

  const renderSubmitter = useCallback(
    (submitter: Submitter) => {
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
    },
    [loading, disabled],
  );

  return (
    <Form
      ref={ref}
      disabled={disabled}
      layout={layout}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      {...formProps}
    >
      <Row gutter={24} wrap>
        {Object.entries(config).map(([field, conf]) => renderField(field, conf))}
      </Row>
      {submitter && renderSubmitter(submitter)}
    </Form>
  );
};

const _CustomForm = forwardRef(CustomForm);

export default _CustomForm;
