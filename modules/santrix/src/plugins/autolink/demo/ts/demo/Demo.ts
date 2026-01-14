import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'autolink code',
  toolbar: 'autolink code',
  height: 600
});

export {};
