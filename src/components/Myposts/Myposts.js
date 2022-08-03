import MypostsContainer from "./MypostsContainer";
import {useSelector} from 'react-redux';

const Myposts = function({AllPostsArray}){
    const UserId = useSelector((state)=>state.auth.userId);
    const MyPostsArray = AllPostsArray?.filter((item)=>{
        return item.user === UserId; 
    });
    return(
        <MypostsContainer MyPostsArray={MyPostsArray} />
    );
}

export default Myposts;