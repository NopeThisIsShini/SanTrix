import { describe } from '@ephox/bedrock-client';

import { ToolbarLocation, ToolbarMode } from 'santrix/themes/silver/api/Options';

import { testStickyHeader } from '../../../module/StickyHeaderStep';

describe('browser.santrix.themes.silver.editor.header.StickyHeaderBottomTest', () => {
  testStickyHeader(ToolbarMode.default, ToolbarLocation.bottom);
  testStickyHeader(ToolbarMode.floating, ToolbarLocation.bottom);
  testStickyHeader(ToolbarMode.sliding, ToolbarLocation.bottom);
});
