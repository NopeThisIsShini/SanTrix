import { ApproxStructure, Assertions, StructAssert } from '@ephox/agar';
import { before, describe, it } from '@ephox/bedrock-client';
import { McEditor, TinyDom } from '@ephox/wrap-mcagar';

import Editor from 'santrix/core/api/Editor';
import EditorManager from 'santrix/core/api/EditorManager';
import { RawEditorOptions } from 'santrix/core/api/OptionTypes';

describe('browser.santrix.themes.silver.editor.SilverEditorDirectionalityTest', () => {
  before(() => {
    EditorManager.addI18n('ar', {
      Bold: 'Bold test',
      _dir: 'rtl'
    });
  });

  const setContent = (editor: Editor, content: string) =>
    editor.editorCommands.execCommand('mceSetContent', false, content);

  const pTest = async (config: RawEditorOptions, label: string, editorStructure: StructAssert) => {
    const editor = await McEditor.pFromSettings<Editor>({
      base_url: '/project/santrix/js/santrix',
      ...config
    });
    setContent(editor, '<p>Hello world!</p>');
    Assertions.assertStructure(
      label,
      editorStructure,
      TinyDom.container(editor)
    );
    McEditor.remove(editor);
  };

  it('TBA: Test directionality of the editor UI when set to use a rtl language', () => pTest(
    {
      language: 'ar',
    },
    'Directionality of the editor UI should be `rtl` when using a rtl language',
    ApproxStructure.build((s, str, arr) => s.element('div', {
      classes: [ arr.has('tox-santrix') ],
      attrs: { dir: str.is('rtl') }
    }))
  ));

  it('TBA: Test directionality of the editor UI when set to use a language without directionality', () => pTest(
    {
      language: 'en',
    },
    'Directionality of the editor UI should not be set when using a language without directionality',
    ApproxStructure.build((s, str, arr) => s.element('div', {
      classes: [ arr.has('tox-santrix') ],
      attrs: { dir: str.none() }
    }))
  ));
});
