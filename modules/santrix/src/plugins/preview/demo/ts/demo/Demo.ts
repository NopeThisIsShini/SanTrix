import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  theme: 'silver',
  skin_url: '../../../../../js/santrix/skins/ui/oxide',
  plugins: 'preview code',
  toolbar: 'preview code',
  height: 600
});

export {};
