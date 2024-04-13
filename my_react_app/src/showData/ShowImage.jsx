import Navbar from './Navbar';
import ImageLog from './ImageLog';
import NewCard from './NewCard';
function ShowImage() {

    return (
        <div className='flex h-screen bg-black'>
            <Navbar/>
            <div className='flex flex-col w-2/4 h-full items-start justify-start px-8' style={{ marginLeft: "30%", marginTop: "30" }}>
                <NewCard/>
                <ImageLog/>    
            </div>
        </div>
    );
}
export default ShowImage;