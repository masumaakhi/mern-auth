import { createContext, useState , useEffect} from "react";
import axios from 'axios';
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const backendUrl = "https://mern-auth-backend-rn8i.onrender.com";
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);


//User tar data dekhte pabe
 const getUserData = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/user/data', {
       withCredentials: true
    });
    console.log("Received user data:", data);

    if (data.success) {
      setUserData(data.userData);
      if (data.userData.role === "admin") {
        fetchAllUsers();
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

//admin user data access korbe
const fetchAllUsers = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/admin/users', {
      withCredentials: true // যদি cookie-based token হয়
    });
    if (data.success) {
      setAllUsers(data.users);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to fetch users: " + error.message);
  }
};

useEffect(() => {
  getUserData();  // auto login if cookie/session valid
}, []);

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        allUsers,
        fetchAllUsers,
        setAllUsers
     //    getAuth
    };

     return (
          <AppContext.Provider value={value}>
               {props.children}
          </AppContext.Provider>
     )
}
