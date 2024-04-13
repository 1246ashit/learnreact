function ImgCards(props) {
    return (
        <>
            <div className='flex w-4/5 h-auto items-center justify-center rounded-xl bg-purple-700 mt-4'>
                <img className='w-10/12 h-auto rounded-xl p-1 '
                    src={props.path} />
            </div>
        </>
    );
}
export default ImgCards;