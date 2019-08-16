import React from 'react';
import previewImage from '../../../components/previewImage';

const imgArr = [
  'http://img.yzcdn.cn/public_files/2017/6/30/b0717bad7ad3ebd025e175d624ade39f.png',
  // 'http://img.yzcdn.cn/public_files/2017/6/30/8a0536db89fafaa1269afeaa807a579b.png',
  // 'http://img.yzcdn.cn/public_files/2017/6/30/7fe46674b697a514d9b6e2e155e88f1c.png',
  // 'http://img.yzcdn.cn/public_files/2017/6/30/b7a98d721698fe8dc93689683706db45.png'
  'http://companion.3ds.com/updl/CLS/4/46/1544200912782/en/thumbnails/1448641799/Course_thumbnail_medium.jpg',
];

class PreviewImageDemo extends React.Component {
  handlePreview = (e) => {
    previewImage({
      images: imgArr,
      index: imgArr.indexOf(e.target.src),
      parentComponent: this,
      scaleRatio: 1.8
    });
  }

  render() {
    return (
      <div className="image-preview-demo">
        {
          imgArr.map((image, index) => {
            return (<img src={image} key={index} onClick={this.handlePreview} alt="" width="160" />);
          })
        }
      </div>
    )
  }  
}

export default PreviewImageDemo;