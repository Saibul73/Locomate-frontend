

const usersReducer=(
    state={users:[],loading:false,error:false},
    action
    )=> {
  switch (action.type) {
    case "USERSFETCH_START":
        return {...state,loading:true,error:false}
    case "USERSFETCH_SUCCESS":
  return{...state,users:action.data,loading:false,error:false}
  case "USERSFETCH_FAIL":
    return {...state,loading:false,error:true}
    default:
        return state
  }
}

export default usersReducer