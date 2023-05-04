import { Carousel, Spin } from 'antd';
import { useState } from 'react';

const App = () => {
  const [loading, setLoading] = useState(true);
  const images = [
    'https://picsum.photos/id/1018/1000/226',
    'https://picsum.photos/id/1015/1000/226',
    'https://picsum.photos/id/1019/1000/226',
    'https://picsum.photos/id/1021/1000/226',
  ];

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="carousel-container" style={{marginBottom:"1rem"}}>
      <Spin spinning={loading}>
      <Carousel autoplay afterChange={handleImageLoad}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              style={{ height: '15rem' }}
              src={image}
              alt="Carousel"
              onLoad={index === 0 ? handleImageLoad : undefined}
            />
          </div>
        ))}
      </Carousel>
      </Spin>
    </div>
  );
};

export default App;
