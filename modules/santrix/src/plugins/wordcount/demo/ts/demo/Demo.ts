import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'wordcount code',
  toolbar: 'wordcount',
  height: 600
});

export {};
