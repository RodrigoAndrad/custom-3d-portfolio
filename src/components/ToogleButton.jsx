const ToogleButton = ({isHiResSound, setIsHiResSound}) => {

    const onChangeHandler = ()=>{
        setIsHiResSound(!isHiResSound);
    }

    return (
        <>
            <div className="items-center justify-center mb-0  absolute bottom-2.5 left-5 w-[11rem] h-[5%] z-500  select-none">
                <label
                    htmlFor="toogle"
                    className="flex items-center cursor-pointer"
                >
                    <div className="relative z-500">
                        <input id="toogle" type="checkbox" className="sr-only" value={isHiResSound} onChange={onChangeHandler} />
                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner border-2 border-neutral-950"></div>
                        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition border-2 border-neutral-950"></div>
                    </div>
                    <div className="ml-3 text-black" style={{ fontFamily: 'Shojumaru' }}>
                        {isHiResSound ? 'Low-Fi Music Off' : 'Low-Fi Music On'}
                    </div>
                </label>
            </div>
        </>
    )
}

export default ToogleButton