export const checkChange = ()=>{
    return{
        type:"CHECK_CHANGE"
    }
};
export const initCollection = (value)=>{
    return{
        type:"INIT_COLLECTION",
        value: value
    }
};
export const checkSignIn = (sign)=>{
    return{
        type:"CHECK_SIGN_IN",
        check:sign
    }
};
export const currentUser = (user)=>{
    return{
        type:"CURRENT_USER",
        user:user
    }
};
export const changeSort = (prop,val) =>{
    return{
        type:"CHANGE_SORT",
        val: val,
        prop:prop
    }
};