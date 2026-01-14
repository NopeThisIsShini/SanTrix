import Editor from 'santrix/core/api/Editor';
import ModelManager, { Model } from 'santrix/core/api/ModelManager';

import * as Table from './table/Table';

const DomModel = (editor: Editor): Model => {
  const table = Table.setupTable(editor);

  return {
    table
  };
};

export default (): void => {
  ModelManager.add('dom', DomModel);
};
