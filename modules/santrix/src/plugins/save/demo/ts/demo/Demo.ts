import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  theme: 'silver',
  skin_url: '../../../../../js/santrix/skins/ui/oxide',
  plugins: 'save code',
  toolbar: 'save code',
  height: 600
  // save_onsavecallback: () => { console.log('saved'); }
});

export {};
