import React, { forwardRef, type HtmlHTMLAttributes, useCallback } from 'react';
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
import type { FormListProps } from 'antd/es/form';
import type { PasswordProps, SearchProps, TextAreaProps } from 'antd/es/input';
import type { ValidatorRule } from 'rc-field-form/lib/interface';

import Email, { type EmailProps } from '../email';

import './index.global.less';

/** Api */
export interface CustomFormProps extends FormProps {
  /** 表单字段配置 */
  config: CustomFormConfig;
  /** 表单实例 */
  form?: FormInstance;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 提交按钮配置 */
  submitter?: false | Submitter;
}
/** 字段类型 */
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

/** List配置 */
interface ListConfig extends CustomFormConfig {
  /** 字段配置 */
  [field: string]: CustomFormFieldConfig<CustomFormFieldType, Record<string, unknown>>;
}

/** 字段配置 */
interface CustomFormFieldConfig<T extends CustomFormFieldType, C extends Record<string, unknown>>
  extends FormItemProps {
  /** 类型
   * @default 'string'
   */
  type?: T;
  /** 自定义时使用的组件 */
  component?: T extends 'custom' ? React.ComponentType : never;
  /** 组件的props */
  props?: FieldProps<T, C>;
  /** 列的props */
  colProps?: Omit<ColProps, 'children'>;
  /** 类型为list时, 配置list中各项属性 */
  config?: T extends 'list' ? ListConfig : never;
  /** 类型为list时, 配置list中各项的最大数量 */
  maxLength?: T extends 'list' ? number : never;
  /** 类型为list时, 配置list中各项的最小数量 */
  minLength?: T extends 'list' ? number : never;
  /** 类型为list时, 配置添加按钮的文本
   * @default '添加项目'
   */
  addText?: T extends 'list' ? string : never;
  /** 类型为list时, 配置添加按钮的props */
  addProps?: T extends 'list' ? Omit<ButtonProps, 'onClick' | 'children'> : never;
  /** 类型为list时, 配置添加按钮的回调 */
  onAdd?: T extends 'list'
    ? (fields: FormListFieldData[], add: FormListOperation['add']) => void
    : never;
  /** 类型为list时, 配置删除按钮的props */
  removeProps?: T extends 'list' ? Omit<ButtonProps, 'onClick' | 'children'> : never;
  /** 类型为list时, 配置删除按钮的文本 */
  removeText?: T extends 'list' ? string : never;
  /** 类型为list时, 配置删除按钮的回调 */
  onRemove?: T extends 'list'
    ? (field: FormListFieldData, remove: FormListOperation['remove']) => void
    : never;
}

/** 表单配置 */
interface CustomFormConfig {
  [field: string]: CustomFormFieldConfig<CustomFormFieldType, Record<string, unknown>>;
}

/** 表单提交按钮配置 */
interface Submitter extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 提交按钮的文本 */
  submitText?: React.ReactNode;
  /** 重置按钮的文本 */
  resetText?: React.ReactNode;
  /** 重置按钮的props */
  resetProps?: Omit<ButtonProps, 'children'>;
  /** 提交按钮的props */
  submitProps?: Omit<ButtonProps, 'children'>;
  /** 自定义提交按钮 */
  render?: (doms: React.ReactNode[]) => React.ReactNode;
}

/**
 * 不同类型字段对应的props
 * @ignore optional
 */
interface FieldPropsMap<C extends Record<string, unknown>> {
  /** 密码输入框 */
  password: PasswordProps;
  /** 邮箱输入框 */
  email: EmailProps;
  /** 选择框 */
  select: SelectProps;
  /** 数字输入框 */
  number: InputNumberProps;
  /** 开关 */
  boolean: SwitchProps;
  /** 单选框 */
  radio: RadioProps;
  /** 多选框 */
  checkbox: CheckboxProps;
  /** 日期选择器 */
  date: DatePickerProps;
  /** 时间选择器 */
  time: TimePickerProps;
  /** 周选择器 */
  week: WeekPickerProps;
  /** 月选择器 */
  month: MonthPickerProps;
  /** 年选择器 */
  year: MonthPickerProps;
  /** 季度选择器 */
  quarter: MonthPickerProps;
  /** 范围选择器 */
  range: RangePickerProps;
  /** 颜色选择器 */
  color: ColorPickerProps;
  /** 文本域 */
  textarea: TextAreaProps;
  /** 上传组件 */
  upload: UploadProps;
  /** 滑块 */
  slider: SliderSingleProps;
  /** 分段器 */
  segmented: SegmentedProps;
  /** 搜索框 */
  search: SearchProps;
  /** 自动完成 */
  autoComplete: AutoCompleteProps;
  /** 级联选择器 */
  cascader: CascaderProps;
  /** 自定义组件 */
  custom: C;
  /** 字符串输入框 */
  string: InputProps;
  /** 列表 */
  list: FormListProps;
}

type FieldProps<
  T extends CustomFormFieldType,
  C extends Record<string, unknown>,
> = FieldPropsMap<C>[T];

/**
 * 不同类型字段对应的组件
 */
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
    submitter = {} as Submitter,
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
      addText = '添加项目s',
      onAdd,
      rules,
      ...rest
    } = conf;
    const name = conf.name || field;
    const fieldProps = props as InputProps;

    if (['checkbox', 'boolean', 'radio'].includes(type)) {
      rest.valuePropName = 'checked';
    } else if (type !== 'list') {
      if (!['segmented', 'number'].includes(type) && fieldProps.allowClear === void 0) {
        fieldProps.allowClear = true;
      }
      if (fieldProps.placeholder === void 0) {
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
                      {fieldIsString ? (
                        <div style={{ flex: 1 }}>{renderField(field.name, listConfig)}</div>
                      ) : (
                        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>
                          {Object.entries(listConfig).map(([key, c]) =>
                            renderField([field.name, key], c),
                          )}
                        </div>
                      )}
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
        className,
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

      return (
        <div className={['custom-form-submitter', className].filter(Boolean).join(' ')} {...rest}>
          {render ? render(doms) : doms}
        </div>
      );
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
