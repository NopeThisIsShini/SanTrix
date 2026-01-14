import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'codesample code',
  toolbar: 'codesample code',
  content_css: '../../../../../js/santrix/skins/content/default/content.css',
  height: 600
});

santrix.init({
  selector: 'div.santrix',
  inline: true,
  plugins: 'codesample code',
  toolbar: 'codesample code',
  content_css: '../../../../../js/santrix/skins/content/default/content.css',
  height: 600
});

export {};
