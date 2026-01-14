import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

const elm = document.querySelector('.santrix') as HTMLTextAreaElement;
elm.value = 'The format menu should show "red"';

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'importcss code',
  toolbar: 'styles code',
  height: 600,
  content_css: '../css/rules.css'
});

export {};
