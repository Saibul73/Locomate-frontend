import * as AuthApi from '../Api/AuthRequest';

export const logIn = (formData) => async(dispatch)=>{
    
    dispatch({type:"AUTH_START"})
    console.log('loading....');
    try {
        const  {data} = await AuthApi.logIn(formData)
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL",data:error.response.data.message})
    }
}


export const signUp = (formData) => async(dispatch)=>{
    
    dispatch({type:"AUTH_START"})
    console.log('loading....');
    try {
        const  {data} = await AuthApi.signUp(formData)
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log("hooii",error.response.data.message,"haaiii");
        dispatch({type:"AUTH_FAIL",data:error.response.data.message})
    }
}

export const logOut = ()=> async (dispatch)=>{
    dispatch({type:"LOG_OUT"})
}


export const reset = ()=> async (dispatch)=>{
    dispatch({type:"RESET"})
}