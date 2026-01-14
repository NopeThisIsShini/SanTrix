import Editor from 'santrix/core/api/Editor';
import { EditorEvent } from 'santrix/core/api/util/EventDispatcher';

const fireInsertCustomChar = (editor: Editor, chr: string): EditorEvent<{ chr: string }> => {
  return editor.dispatch('insertCustomChar', { chr });
};

export {
  fireInsertCustomChar
};
