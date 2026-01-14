import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'santrix/core/api/Editor';
import * as IframeContent from 'santrix/plugins/preview/core/IframeContent';
import Plugin from 'santrix/plugins/preview/Plugin';

describe('browser.santrix.plugins.preview.PreviewContentCssTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    plugins: 'preview',
    base_url: '/project/santrix/js/santrix',
    content_css: '/project/santrix/js/santrix/skins/content/default/content.css'
  }, [ Plugin ]);

  const assertIframeHtmlContains = (editor: Editor, text: string) => {
    const actual = IframeContent.getPreviewHtml(editor);
    const regexp = new RegExp(text);

    assert.match(actual, regexp, 'Should be the same html');
  };

  it('TBA: Set content, set content_css_cors and assert link elements. Delete setting and assert crossOrigin attr is removed', () => {
    const editor = hook.editor();
    const contentCssUrl = editor.documentBaseURI.toAbsolute('/project/santrix/js/santrix/skins/content/default/content.css');

    editor.setContent('<p>hello world</p>');
    editor.options.set('content_css_cors', true);
    assertIframeHtmlContains(editor, `<link type="text/css" rel="stylesheet" href="${contentCssUrl}" crossorigin="anonymous">`);
    editor.options.set('content_css_cors', false);
    assertIframeHtmlContains(editor, `<link type="text/css" rel="stylesheet" href="${contentCssUrl}">`);
  });
});
