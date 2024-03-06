import CardOption from './CardOption';
function Card(props){
    return (
        <div className="  p-4 w-2/4" style={{ marginLeft: '25%' }}>
          {props.heroes.map((hero, index) => {
            // 確保第二個陣列中有對應的元素
            const profile = props.profiles[index];
    
            return (
              <div key={hero.id} className="bg-white shadow-md rounded-lg overflow-hidden m-4">
                <div className="p-4">
                  <img src={"./src/assets/"+profile}  />
                  <h2 className="text-xl font-bold">{`${hero.firstName} ${hero.lastName}`}</h2>
                  <p className="text-gray-700">地點：{hero.place}</p>
                  <p className="text-gray-700">能力：{hero.power}</p>
                  <CardOption/>
                </div>
              </div>
            );
          })}
        </div>
      );
}
export default Card;