import ProjectileMotion from "./ProjectileMotion.tsx";

function Canvas() {

    const backgroundImageUrl = "https://images.unsplash.com/photo-1602357280104-742c517a1d82?q=80&w=2750&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className='flex justify-center items-center h-screen '>
            <div className='card flex flex-col justify-center items-center  max-w-[1120px] w-[1120px] border-2 border-light_bg rounded-[20px]'>
                <div className="navbar flex justify-between w-full bg-dark_bg rounded-se-[20px] rounded-tl-2xl border-b-2 border-light_bg ">
                    <div className="flex justify-evenly w-full">

                    </div>
                    <div className="fullscreen-btn flex items-center content-center mr-[18px] cursor-pointer">

                    </div>
                </div>
                <div className="canvas-background-image  bg-light_bg rounded-ee-[20px] rounded-bl-[20px] flex justify-center items-center" style={{backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                    <div className="canvas-content h-[550px] w-[1115px] ">
                        <ProjectileMotion />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Canvas;
