import React, { type FC, useCallback, useDeferredValue, useState } from 'react';
import { AutoComplete, type AutoCompleteProps } from 'antd';

import HighlightText from '../highlight-text';

export interface EmailProps extends AutoCompleteProps {
  emailList?: string[];
}
/**
 * Email域名白名单
 */
const emailWhitelist = [
  '@qq.com',
  '@163.com',
  '@vip.163.com',
  '@263.net',
  '@yeah.net',
  '@sohu.com',
  '@sina.cn',
  '@sina.com',
  '@eyou.com',
  '@gmail.com',
  '@hotmail.com',
  '@42du.cn',
];

const Email: FC<EmailProps> = ({ emailList = emailWhitelist, ...props }) => {
  const [result, setResult] = useState<AutoCompleteProps['options']>([]);
  const options = useDeferredValue(result);
  const handleSearch = useCallback(
    (val: string) => {
      let res: AutoCompleteProps['options'] = [],
        whitelist = emailList,
        inputValue = val;

      if (!val || val.indexOf('@') >= 0) {
        const domainVal = val.split('@');

        inputValue = domainVal[0];
        whitelist = emailList.filter((domain) => domain.includes(domainVal[1]));
      }
      res = whitelist.map((domain) => {
        const text = inputValue + domain;

        return {
          value: text,
          label: <HighlightText text={inputValue} highlight={domain} />,
        };
      });
      setResult(res);
    },
    [emailList],
  );

  return <AutoComplete {...props} options={options} onSearch={handleSearch} />;
};

export default Email;
