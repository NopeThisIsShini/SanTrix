import { describe, it } from '@ephox/bedrock-client';
import { Class, Traverse } from '@ephox/sugar';
import { TinyDom, TinyHooks } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'santrix/core/api/Editor';

describe('browser.santrix.themes.silver.editor.ToxWrappingTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    menubar: true,
    base_url: '/project/santrix/js/santrix'
  }, []);

  it('Check editor container has tox-santrix wrapper', () => {
    const editor = hook.editor();
    const elem = TinyDom.targetElement(editor);
    const container = Traverse.nextSibling(elem).getOrDie('Replaced element has no next sibling');
    const hasToxWrapper = Class.has(container, 'tox-santrix');
    assert.isTrue(hasToxWrapper, `Replaced element's next sibling has "tox-santrix" class`);
  });
});
