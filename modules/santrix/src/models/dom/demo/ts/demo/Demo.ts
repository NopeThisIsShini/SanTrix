import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'div.santrix',
  setup: (ed) => {
    ed.on('init', () => {
      const runtimeModel = ed.model;
      // eslint-disable-next-line no-console
      console.log('demo model created', runtimeModel);
    });
  }
});
