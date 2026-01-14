import Editor from 'santrix/core/api/Editor';
import { EditorEvent } from 'santrix/core/api/util/EventDispatcher';

const fireResizeEditor = (editor: Editor): EditorEvent<{}> =>
  editor.dispatch('ResizeEditor');

export {
  fireResizeEditor
};
