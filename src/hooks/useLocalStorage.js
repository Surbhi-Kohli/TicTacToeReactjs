import React from "react";
function useLocalStorage(key,value='')
{
  const [state,setState]=React.useState(()=>{
      const valInLocalStorage=window.localStorage.getItem(key);
      if(valInLocalStorage)
      {
        return JSON.parse(valInLocalStorage);
      }
     return typeof value==='function'?value():value;
  })
  React.useEffect(()=>{
    
  window.localStorage.setItem(key,JSON.stringify(state));
  },[key,state])

  return [state,setState];
}
export default useLocalStorage;