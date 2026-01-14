import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'autosave code',
  toolbar: 'restoredraft code',
  height: 600,
  autosave_interval: '10s',
  menus: {
    File: [ 'restoredraft' ]
  }
});

export {};
