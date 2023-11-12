import {BallTriangle} from "react-loader-spinner";
const LoaderComp = () => {
 
    return (
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#007bb5"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
 
    );
}
export {LoaderComp};