import {UserContext} from "./UserContext"
const checkAuthentication = () => {
   
    const userStore = UserContext()
    const user = userStore.user

    if (user === false) {
        return false
    } 
        return true
    
}

export default checkAuthentication