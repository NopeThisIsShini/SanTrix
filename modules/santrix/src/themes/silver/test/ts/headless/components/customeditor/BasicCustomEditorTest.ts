import { ApproxStructure, Assertions, Waiter } from '@ephox/agar';
import { GuiFactory, TestHelpers } from '@ephox/alloy';
import { after, before, describe, it } from '@ephox/bedrock-client';
import { Cell, Fun, Global, Optional } from '@ephox/katamari';
import { Class, SugarElement } from '@ephox/sugar';

import Resource from 'santrix/core/api/Resource';
import { SanTrix } from 'santrix/core/api/Santrix';
import { renderCustomEditor } from 'santrix/themes/silver/ui/dialog/CustomEditor';

import * as RepresentingUtils from '../../../module/RepresentingUtils';

declare const santrix: SanTrix;

describe('headless.santrix.themes.silver.components.customeditor.BasicCustomEditorTest', () => {
  const resolveInit = Cell(false);
  const customEditorValue = Cell('zztop');

  let origTiny: SanTrix | undefined;
  before(() => {
    origTiny = Global.santrix;
    Global.santrix = {
      Resource
    };

    santrix.Resource.add('BasicCustomEditorTest', (e: HTMLElement) => new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (resolveInit.get()) {
          clearInterval(intervalId);
          Class.add(SugarElement.fromDom(e), 'my-custom-editor');
          resolve({
            setValue: (s: string) => customEditorValue.set(s),
            getValue: () => customEditorValue.get(),
            destroy: Fun.noop
          });
        }
      }, 100);
    }));
  });

  after(() => {
    Global.santrix = origTiny;
    origTiny = undefined;
  });

  const hook = TestHelpers.GuiSetup.bddSetup((_store, _doc, _body) => GuiFactory.build(
    renderCustomEditor({
      type: 'customeditor',
      name: 'customeditor',
      tag: 'textarea',
      scriptId: 'BasicCustomEditorTest',
      scriptUrl: '/custom/404', // using the cache
      settings: undefined,
      onFocus: Optional.none()
    })
  ));

  it('Check basic structure', () => {
    Assertions.assertStructure(
      'Checking initial structure',
      ApproxStructure.build((s, _str, arr) => s.element('div', {
        children: [
          s.element('textarea', {
            classes: [ arr.not('my-custom-editor') ]
          })
        ]
      })),
      hook.component().element
    );
  });

  it('Representing state', async () => {
    const component = hook.component();
    RepresentingUtils.assertRoundtrip(
      component,
      'foo'
    );

    // Set to initialised
    resolveInit.set(true);
    await Waiter.pTryUntil(
      'Waiting for CustomEditor init',
      () => Assertions.assertStructure(
        'Checking structure after init',
        ApproxStructure.build((s, _str, arr) => s.element('div', {
          children: [
            s.element('textarea', {
              classes: [ arr.has('my-custom-editor') ]
            })
          ]
        })),
        component.element
      )
    );

    RepresentingUtils.assertRoundtrip(
      component,
      'bar'
    );
  });
});
