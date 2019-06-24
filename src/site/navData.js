import ColorPicker from '../containers/Picker';
import AffixDemo from './pages/affix/affixDemo';
import UploadDemo from './pages/fileUpload/UploadDemo';
import PreviewImage from './pages/previewImage/PreviewImageDemo';
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
    path: 'fileUpload',
    source: UploadDemo,
  },
  {
    name: 'previewImage',
    path: 'previewImage',
    source: PreviewImage,
  }
];