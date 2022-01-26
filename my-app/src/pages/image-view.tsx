import { useParams } from "react-router";
import { getImageById } from "../services/images";

export default function ImageView(){
    const{id}=useParams<"id">();
    const image=getImageById(Number(id));
    if(!image) return null;
    return(
      <>
      <h1 id="label" style={{margin:0}}>{image.title}</h1>
      <img src={image.src} alt="" width={400} height={400}style={{
          margin:"16px 0",
          borderRadius:"8px",
          width:"100%",
          height:"auto"
      }}/>
      </>
    );
}