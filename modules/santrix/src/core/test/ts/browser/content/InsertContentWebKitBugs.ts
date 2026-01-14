import { describe, it } from '@ephox/bedrock-client';
import { TinyAssertions, TinyHooks, TinySelections } from '@ephox/wrap-mcagar';

import Editor from 'santrix/core/api/Editor';

describe('browser.santrix.core.content.InsertContentTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    indent: false,
    base_url: '/project/santrix/js/santrix',
    content_style: 'blockquote { font-size: 12px }' // Needed to produce spans with runtime styles
  }, []);

  it('Insert contents on a triple click selection should not produce odd spans', () => {
    const editor = hook.editor();
    editor.setContent('<blockquote><p>a</p></blockquote><p>b</p>');
    TinySelections.setSelection(editor, [ 0, 0, 0 ], 0, [ 1 ], 0);
    editor.execCommand('mceInsertContent', false, '<p>c</p>');
    TinyAssertions.assertContent(editor, '<blockquote><p>c</p></blockquote><p>b</p>');
    TinyAssertions.assertSelection(editor, [ 0, 0, 0 ], 1, [ 0, 0, 0 ], 1);
  });
});
