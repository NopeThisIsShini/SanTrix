import { Assertions, UiFinder, Waiter } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks, TinyUiActions } from '@ephox/wrap-mcagar';

import Editor from 'santrix/core/api/Editor';
import Plugin from 'santrix/plugins/table/Plugin';

describe('browser.santrix.plugins.table.TableGridFalse', () => {
  const hook = TinyHooks.bddSetup<Editor>({
    plugins: 'table',
    table_grid: false,
    base_url: '/project/santrix/js/santrix'
  }, [ Plugin ], true);

  it('test table grid disabled', async () => {
    const editor = hook.editor();
    TinyUiActions.clickOnMenu(editor, 'span:contains("Table")');
    await Waiter.pTryUntil('click table menu', () =>
      TinyUiActions.clickOnUi(editor, 'div.tox-menu div.tox-collection__item .tox-collection__item-label:contains("Table")')
    );
    const dialog = await TinyUiActions.pWaitForDialog(editor);
    UiFinder.exists(dialog, 'div.tox-dialog__title:contains("Table Properties")');
    Assertions.assertPresence(
      'assert presence of col and row input',
      {
        'label:contains("Cols")': 1,
        'label:contains("Rows")': 1
      },
      dialog
    );
  });
});
