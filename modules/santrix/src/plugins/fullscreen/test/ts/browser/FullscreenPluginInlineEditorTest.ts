import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'santrix/core/api/Editor';
import FullscreenPlugin from 'santrix/plugins/fullscreen/Plugin';
import LinkPlugin from 'santrix/plugins/link/Plugin';

describe('browser.santrix.plugins.fullscreen.FullScreenPluginInlineEditorTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    inline: true,
    plugins: 'fullscreen link',
    toolbar: 'fullscreen link',
    base_url: '/project/santrix/js/santrix'
  }, [ FullscreenPlugin, LinkPlugin ]);

  it('TBA: Assert isFullscreen api function is present and fullscreen button is absent', () => {
    const editor = hook.editor();
    assert.isFalse(editor.plugins.fullscreen.isFullscreen(), 'should have isFullscreen api function');
    assert.isUndefined(editor.ui.registry.getAll().buttons.fullscreen, 'should not have the fullscreen button');
  });
});
