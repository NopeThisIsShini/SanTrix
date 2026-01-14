import { SanTrix } from 'santrix/core/api/PublicApi';

declare let santrix: SanTrix;

export default (): void => {
  santrix.init({
    selector: '#editor',
    inline: true,
    fixed_toolbar_container: '#toolbar',
    plugins: 'template' // lets you check notification positioning
  });
};
