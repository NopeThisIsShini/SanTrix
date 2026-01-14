import { santrix, SanTrix } from './Santrix';

declare const module: any;
declare const window: any;

const exportToModuleLoaders = (santrix: SanTrix) => {
  if (typeof module === 'object') {
    try {
      module.exports = santrix;
    } catch (_) {
      // It will thrown an error when running this module
      // within webpack where the module.exports object is sealed
    }
  }
};

const exportToWindowGlobal = (santrix: SanTrix) => {
  window.santrix = santrix;
  window.sanTrix = santrix;
};

exportToWindowGlobal(santrix);
exportToModuleLoaders(santrix);
