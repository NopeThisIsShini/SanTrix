import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'searchreplace',
  toolbar: 'searchreplace',
  height: 600,
  menubar: 'custom',
  menu: {
    custom: { title: 'Custom', items: 'searchreplace' }
  }
});

export {};
