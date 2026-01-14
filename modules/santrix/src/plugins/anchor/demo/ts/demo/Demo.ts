import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'anchor code',
  toolbar: 'anchor code',
  height: 600
});

export {};
