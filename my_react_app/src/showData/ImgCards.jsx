import { FaGear } from "react-icons/fa6";
function ImgCards(props) {
    return (
        <>
            <div className='flex w-4/5 h-auto items-center justify-center rounded-xl bg-purple-700 mt-4'>
                <img className='w-10/12 h-auto rounded-xl p-1 '
                    src={props.path.media[0].chunk_path} />
                <div className="cursor-pointer">
                    <FaGear size={'30px'} />
                </div>
            </div>
        </>
    );
}
export default ImgCards;