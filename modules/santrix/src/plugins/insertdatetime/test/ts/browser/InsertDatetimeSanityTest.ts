import { ApproxStructure } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { TinyAssertions, TinyHooks, TinyUiActions } from '@ephox/wrap-mcagar';

import Editor from 'santrix/core/api/Editor';
import Plugin from 'santrix/plugins/insertdatetime/Plugin';

describe('browser.santrix.plugins.insertdatetime.InsertDatetimeSanityTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    plugins: 'insertdatetime',
    toolbar: 'insertdatetime',
    insertdatetime_element: true,
    indent: false,
    base_url: '/project/santrix/js/santrix'
  }, [ Plugin ]);

  it('TBA: Click on Insertdatetime button and select the first item from the drop down menu. Assert date time is inserted', async () => {
    const editor = hook.editor();
    TinyUiActions.clickOnToolbar(editor, '[aria-haspopup="true"]');
    await TinyUiActions.pWaitForUi(editor, '[role="menu"]');
    TinyUiActions.clickOnUi(editor, '[role="menu"] [role="menuitemradio"]:first');

    TinyAssertions.assertContentStructure(editor, ApproxStructure.build((s) => {
      return s.element('body', {
        children: [
          s.element('p', {
            children: [
              s.element('time', {})
            ]
          })
        ]
      });
    }));
  });
});
