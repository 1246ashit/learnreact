import CardOption from './CardOption';

function Card(props) {
  return (
    <div className="p-4 w-3/5" style={{ marginLeft: '25%' }}>
      {props.imgs.map((img) => {
        return (
          <div key={img.imageSha} className="bg-white shadow-md rounded-lg overflow-hidden m-4">
            <div className="p-4 mr-4">
              {img.imgURL && <img src={img.imgURL} alt={`Fetched Image ${img.imageSha}`}/>}
              <CardOption imageSha={img.imageSha} imagePath={img.imagePath}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Card;
