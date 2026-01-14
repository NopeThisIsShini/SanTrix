import { Keyboard, Keys } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { TinyAssertions, TinyDom, TinyHooks } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'santrix/core/api/Editor';
import VK from 'santrix/core/api/util/VK';
import Plugin from 'santrix/plugins/nonbreaking/Plugin';

describe('browser.santrix.plugins.nonbreaking.NonbreakingForceTabTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    plugins: 'nonbreaking',
    toolbar: 'nonbreaking',
    nonbreaking_force_tab: 5,
    theme: 'silver',
    base_url: '/project/santrix/js/santrix'
  }, [ Plugin ], true);

  it('TBA: Undo level on insert tab', () => {
    const editor = hook.editor();
    Keyboard.activeKeystroke(TinyDom.document(editor), Keys.tab());
    TinyAssertions.assertContent(editor, '<p><span class="mce-nbsp-wrap" contenteditable="false">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>');
    editor.undoManager.undo();
    TinyAssertions.assertContent(editor, '');
  });

  it('TBA: Prevent default and other handlers on insert tab', () => {
    const editor = hook.editor();
    const args = editor.dispatch('keydown', { keyCode: VK.TAB } as KeyboardEvent);
    assert.isTrue(args.isDefaultPrevented());
    assert.isTrue(args.isImmediatePropagationStopped());
  });
});
