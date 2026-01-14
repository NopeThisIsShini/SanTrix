import { Direction, SugarElement } from '@ephox/sugar';

import Editor from 'santrix/core/api/Editor';
import { NodeChangeEvent } from 'santrix/core/api/EventTypes';
import { Toolbar } from 'santrix/core/api/ui/Ui';
import { EditorEvent } from 'santrix/core/api/util/EventDispatcher';

const getNodeChangeHandler = (editor: Editor, dir: 'ltr' | 'rtl') => (api: Toolbar.ToolbarToggleButtonInstanceApi) => {
  const nodeChangeHandler = (e: EditorEvent<NodeChangeEvent>) => {
    const element = SugarElement.fromDom(e.element);
    api.setActive(Direction.getDirection(element) === dir);
    api.setEnabled(editor.selection.isEditable());
  };
  editor.on('NodeChange', nodeChangeHandler);
  api.setEnabled(editor.selection.isEditable());

  return () => editor.off('NodeChange', nodeChangeHandler);
};

const register = (editor: Editor): void => {
  editor.ui.registry.addToggleButton('ltr', {
    tooltip: 'Left to right',
    icon: 'ltr',
    onAction: () => editor.execCommand('mceDirectionLTR'),
    onSetup: getNodeChangeHandler(editor, 'ltr')
  });

  editor.ui.registry.addToggleButton('rtl', {
    tooltip: 'Right to left',
    icon: 'rtl',
    onAction: () => editor.execCommand('mceDirectionRTL'),
    onSetup: getNodeChangeHandler(editor, 'rtl')
  });
};

export {
  register
};
