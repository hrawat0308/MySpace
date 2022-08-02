import MypostsContainer from "./MypostsContainer";

const Myposts = function({AllPostsArray}){
    const UserId = "rawat";
    const MyPostsArray = AllPostsArray?.filter((item)=>{
        return item.uid === UserId; 
    });
    return(
        <MypostsContainer MyPostsArray={MyPostsArray} />
    );
}

export default Myposts;