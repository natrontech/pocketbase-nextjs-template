const Loading = () => {


    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center animate-pulse z-40">
            <div className="w-full h-full bg-gray-100 opacity-75 z-50"></div>
            <div className="w-full h-full bg-gray-100 opacity-75 z-50"></div>
            <div className="w-full h-full bg-gray-100 opacity-75 z-50"></div>
        </div>
    )
}

export default Loading;
