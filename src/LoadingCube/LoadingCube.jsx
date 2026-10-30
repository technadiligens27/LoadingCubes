import Experience from "../Experience/Experience"
import LoadingButton from "../LoadingButton/LoadingButton";
import './LoadingCube.css'

const LoadingCube = ()=>{
    return(
        <div className="loading-cube">
            <Experience/>
            <LoadingButton/>
        </div>
    )
}

export default LoadingCube