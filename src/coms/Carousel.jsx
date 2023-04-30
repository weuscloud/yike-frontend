import { Carousel } from 'antd';
const App = () => {
  const images = [
    'https://picsum.photos/id/1018/1000/226',
    'https://picsum.photos/id/1015/1000/226',
    'https://picsum.photos/id/1019/1000/226',
    'https://picsum.photos/id/1021/1000/226',
  ];

  return (
    <div className="carousel-container">
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img style={{height:'15rem'}} src={image} alt="Carousel" />
           
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
