import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'visualchars code',
  toolbar: 'visualchars code',
  visualchars_default_state: true,
  skin_url: '../../../../../js/santrix/skins/ui/oxide',
  height: 600
});

export {};
