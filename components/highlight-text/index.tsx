import React, { type ReactNode, useDeferredValue, useEffect, useState } from 'react';
import { Typography } from 'antd';

export type HighlightTextJsonType =
  | {
      highlight?: boolean;
      text: string;
    }[]
  | null;

/**
 * 高亮字符串语法
 * @example
 * ```
 * const str = '%c:高亮文字:c%';
 * ```
 */
const HIGHLIGHT_RegExp = /%c:(.+?):c%/i;

export interface HighlightTextProps {
  text?: ReactNode;
  highlight?: ReactNode;
}
/**
 * 字符串转换成高亮字符的Json格式
 * @param {string} text 字符串
 * @returns {HighlightTextJsonType} 高亮字符的Json
 */
export function stringToHighlightJson(text: string): HighlightTextJsonType {
  let str = text,
    strArr = HIGHLIGHT_RegExp.exec(str);

  if (strArr) {
    const textArr: HighlightTextJsonType = [];

    for (; strArr !== null; strArr = HIGHLIGHT_RegExp.exec(str)) {
      // 普通部分
      let normalText: string | null = str.substring(0, strArr.index);

      if (normalText.trim().length) {
        textArr.push({
          text: normalText,
        });
      }

      // 高亮部分
      textArr.push({
        highlight: true,
        text: strArr[1],
      });
      str = str.substring(strArr[0].length + strArr.index);
      normalText = null;
    }
    if (str.trim().length) {
      textArr.push({
        text: str,
      });
    }
    return textArr;
  }
  return null;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  highlight,
}: HighlightTextProps) => {
  const [_texts, setTexts] = useState<HighlightTextJsonType>();
  const texts = useDeferredValue(_texts);

  useEffect(() => {
    if (typeof text === 'string') {
      const textArr = stringToHighlightJson(text);

      if (textArr) {
        setTexts(textArr);
      }
    } else {
      setTexts(null);
    }
  }, [text]);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {texts?.map((item, i) => {
        return React.createElement(
          item.highlight ? Typography.Link : (Typography.Text as React.FC),
          { key: i },
          item.text,
        );
      }) ?? text}
      {highlight && <Typography.Link>{highlight}</Typography.Link>}
    </div>
  );
};
