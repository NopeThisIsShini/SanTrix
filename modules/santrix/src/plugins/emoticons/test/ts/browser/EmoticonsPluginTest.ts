import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'santrix/core/api/Editor';
import { EmojiEntry } from 'santrix/plugins/emoticons/core/EmojiDatabase';
import Plugin from 'santrix/plugins/emoticons/Plugin';

describe('browser.santrix.plugins.emoticons.EmoticonsPluginTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    plugins: 'emoticons',
    toolbar: 'emoticons',
    base_url: '/project/santrix/js/santrix',
    emoticons_database_url: '/project/santrix/src/plugins/emoticons/main/js/emojis.js'
  }, [ Plugin ], true);

  it('TINY-10572: The plugin successfully exports the promise function that gives emojis', async () => {
    const editor = hook.editor();
    await editor.plugins.emoticons.getAllEmojis().then((result: EmojiEntry[]) => assert.isArray(result));
  });
});
