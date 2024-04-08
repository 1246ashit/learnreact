import CardOption from './CardOption';

function isImage(filename) {
  // 定義圖片檔案的副檔名數組
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
  // 檢查擴展名是否在圖片檔案副檔名數組中
  return imageExtensions.includes(filename);
}

function isVideo(filename) {
  // 定義影片檔案的副檔名數組
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv'];
  // 檢查副檔名是否在影片檔案副檔名數組中
  return videoExtensions.includes(filename);
}

function Card(props) {
  return (
    <div className="p-4 w-3/5" style={{ marginLeft: '25%' }}>
      {props.imgs.map((img) => {
        return (
          <div key={img.image_id} className="bg-white shadow-md rounded-lg overflow-hidden m-4">
            <div className="p-4 mr-4">
              {/* 根據檔案副檔名選擇正確的標籤來顯示 */}
              {isImage(img.mediatype) && <img src={img.image_name} alt={`Fetched image ${img.imageName}`} />}
              {isVideo(img.mediatype) && (
                <video
                  src={img.image_name}
                  alt={`Fetched video ${img.imageName}`}
                  controls
                  preload="none"
                  //poster="YOUR_POSTER_IMAGE_URL_HERE" // 替換成你的封面圖片URL
                />
              )}
              {!isImage(img.mediatype) && !isVideo(img.mediatype) && <p>Unsupported file type</p>}
              <CardOption image_id={img.image_id} image_name={img.image_name} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
