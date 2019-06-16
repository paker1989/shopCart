import ColorPicker from '../containers/Picker';
import AffixDemo from './pages/affix/affixDemo';
import UploadDemo from './pages/upload/UploadDemo';
import DocLoadable from './DocLoadable';

module.exports = [
  {
    name: 'colorPicker',
    path: 'colorPicker',
    source: ColorPicker,
  },
  {
    name: 'affix',
    path: 'affix',
    // source: DocLoadable({ loader: () => import('../components/affix/README_zh-CN.md') }),
    source: AffixDemo,
  },
  {
    name: 'upload',
    path: 'upload',
    source: UploadDemo,
  }
];