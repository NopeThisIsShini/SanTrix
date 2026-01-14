import { describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';

import * as InternalHtml from 'santrix/core/paste/InternalHtml';

describe('atomic.santrix.core.paste.InternalHtmlTest', () => {
  it('mark', () => {
    assert.equal(InternalHtml.mark('abc'), '<!-- x-santrix/html -->abc');
  });

  it('unmark', () => {
    assert.equal(InternalHtml.unmark('<!-- x-santrix/html -->abc'), 'abc');
    assert.equal(InternalHtml.unmark('abc<!-- x-santrix/html -->'), 'abc');
  });

  it('isMarked', () => {
    assert.isTrue(InternalHtml.isMarked('<!-- x-santrix/html -->abc'));
    assert.isTrue(InternalHtml.isMarked('abc<!-- x-santrix/html -->'));
    assert.isFalse(InternalHtml.isMarked('abc'));
  });

  it('internalHtmlMime', () => {
    assert.equal(InternalHtml.internalHtmlMime(), 'x-santrix/html');
  });
});
