import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  theme: 'silver',
  skin_url: '../../../../../js/santrix/skins/ui/oxide',
  plugins: 'nonbreaking code',
  toolbar: 'nonbreaking code',
  height: 600
});

export {};
