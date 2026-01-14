import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'fullscreen code',
  toolbar: 'fullscreen code',
  height: 600,
  fullscreen_native: true
});

santrix.init({
  selector: 'textarea.santrix2',
  plugins: 'fullscreen code',
  toolbar: 'fullscreen code',
  height: 600
});

export {};
