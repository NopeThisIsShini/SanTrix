import Editor from 'santrix/core/api/Editor';
import { StyleFormat } from 'santrix/core/api/fmt/StyleFormat';

import * as ImportCss from '../core/ImportCss';

export interface Api {
  readonly convertSelectorToFormat: (selectorText: string) => StyleFormat | undefined;
}

const get = (editor: Editor): Api => {
  const convertSelectorToFormat = (selectorText: string) => {
    return ImportCss.defaultConvertSelectorToFormat(editor, selectorText);
  };

  return {
    convertSelectorToFormat
  };
};

export {
  get
};
