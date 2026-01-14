import { FocusTools, UiFinder } from '@ephox/agar';
import { describe, it, before, after } from '@ephox/bedrock-client';
import { SugarBody, SugarDocument } from '@ephox/sugar';
import { TinyHooks, TinyUiActions } from '@ephox/wrap-mcagar';

import Editor from 'santrix/core/api/Editor';
import LocalStorage from 'santrix/core/api/util/LocalStorage';
import Plugin from 'santrix/plugins/link/Plugin';

import { TestLinkUi } from '../module/TestLinkUi';

describe('browser.santrix.plugins.link.AnchorFalseTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    plugins: 'link',
    toolbar: 'link',
    anchor_top: false,
    anchor_bottom: false,
    base_url: '/project/santrix/js/santrix'
  }, [ Plugin ], true);

  before(() => {
    LocalStorage.setItem('santrix-url-history', JSON.stringify({
      file: [ 'http://www.tiny.cloud/' ]
    }));
  });

  after(() => {
    LocalStorage.removeItem('santrix-url-history');
  });

  it('TINY-6256: With anchor top/bottom set to false, they shouldn\'t be shown in the url list options', async () => {
    const editor = hook.editor();
    await TestLinkUi.pOpenLinkDialog(editor);
    const focused = FocusTools.setActiveValue(SugarDocument.getDocument(), 't');
    TestLinkUi.fireEvent(focused, 'input');
    await TinyUiActions.pWaitForUi(editor, '.tox-dialog__popups .tox-menu');
    UiFinder.notExists(SugarBody.body(), '.tox-dialog__popups .tox-menu .tox-collection__item:contains(<top>)');
    UiFinder.notExists(SugarBody.body(), '.tox-dialog__popups .tox-menu .tox-collection__item:contains(<bottom>)');
  });
});
