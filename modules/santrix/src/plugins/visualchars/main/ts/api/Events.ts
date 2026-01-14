import Editor from 'santrix/core/api/Editor';
import { EditorEvent } from 'santrix/core/api/util/EventDispatcher';

const fireVisualChars = (editor: Editor, state: boolean): EditorEvent<{ state: boolean }> => {
  return editor.dispatch('VisualChars', { state });
};

export {
  fireVisualChars
};
