import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'insertdatetime code',
  toolbar: 'insertdatetime code',
  height: 600,
  menubar: 'insertdatetime',
  menu: {
    insertdatetime: { title: 'Insert Date/Time', items: 'insertdatetime' }
  }
});

export {};
