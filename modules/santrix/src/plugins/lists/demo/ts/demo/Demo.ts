import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'lists code',
  toolbar: 'numlist bullist | outdent indent | code',
  height: 600,
  contextmenu: 'lists'
});

export {};
