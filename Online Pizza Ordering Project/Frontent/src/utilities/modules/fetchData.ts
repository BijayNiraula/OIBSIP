const fetchData=async(url:string,options:any)=>{
    const res=await fetch(url,options);
    const result=await res.json();
     return result;
}
export default fetchData;
