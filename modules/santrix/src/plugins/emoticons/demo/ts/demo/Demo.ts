import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

santrix.init({
  selector: 'textarea.santrix',
  plugins: 'emoticons code',
  toolbar: 'emoticons code',
  emoticons_database_url: '/src/plugins/emoticons/main/js/emojis.js',
  height: 600,
  emoticons_append: {
    brain_explode: {
      keywords: [ 'brain', 'explode', 'blown' ],
      char: '\ud83e\udd2f'
    }
  }
});

export {};
