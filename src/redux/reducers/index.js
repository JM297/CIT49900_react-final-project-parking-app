const initState = {
    toggle: false,
    change:false,
    signedIn:false,
    realUser:{ id: "", name: "" },
    garages: [],
    sort: {
        check: {toggle:false, val:[]}
    }
};

const rootReducer = (state=initState, action)=>{
    if(action.type==="SET_TOGGLE"){
        return {
            ...state,
            toggle:!state.toggle,
        }
    }
    if(action.type==="CHANGE_SORT"){
        let orgArray = state.sort[action.prop].val;
        if(orgArray.includes(action.val)){
            let ind = orgArray.indexOf(action.val);
            orgArray.splice(ind,1);
        }else{
            orgArray.push(action.val);
        }
        let togg=orgArray.length>0;
        return {
            ...state,
            sort: {
                ...state.sort,
                [action.prop]:{
                    toggle:togg,
                    val:orgArray
                }
            }
        }
    }
    if(action.type==="INIT_COLLECTION"){
        return{
            ...state,
            garages:action.value
        }
    }
    if(action.type==="CHECK_CHANGE"){
        return{
            ...state,
            change:!state.change
        }
    }
    if(action.type==="CHECK_SIGN_IN"){
        return{
            ...state,
            signedIn:action.check
        }
    }
    if(action.type==="CURRENT_USER"){
        return{
            ...state,
            realUser: {
                name:action.user.displayName
            }
        }
    }
    return state;
};

export default rootReducer;