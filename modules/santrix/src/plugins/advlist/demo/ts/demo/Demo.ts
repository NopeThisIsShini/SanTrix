import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'lists advlist code',
  toolbar: 'bullist numlist | outdent indent | code',
  height: 600
});

export {};
