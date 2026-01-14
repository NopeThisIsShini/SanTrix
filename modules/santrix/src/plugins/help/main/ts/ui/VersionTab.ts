import EditorManager from 'santrix/core/api/EditorManager';
import { Dialog } from 'santrix/core/api/ui/Ui';
import I18n from 'santrix/core/api/util/I18n';

const tab = (): Dialog.TabSpec & { name: string } => {
  const getVersion = (major: string, minor: string) => major.indexOf('@') === 0 ? 'X.X.X' : major + '.' + minor;
  const version = getVersion(EditorManager.majorVersion, EditorManager.minorVersion);
  const changeLogLink = '<a data-alloy-tabstop="true" tabindex="-1" href="https://santrix.org/docs/santrix/1/changelog/?utm_campaign=help_dialog_version_tab&utm_source=editor&utm_medium=referral" rel="noopener" target="_blank">SanTrix ' + version + '</a>';

  const htmlPanel: Dialog.HtmlPanelSpec = {
    type: 'htmlpanel',
    html: '<p>' + I18n.translate([ 'You are using {0}', changeLogLink ]) + '</p>',
    presets: 'document'
  };

  return {
    name: 'versions',
    title: 'Version',
    items: [
      htmlPanel
    ]
  };
};

export {
  tab
};
