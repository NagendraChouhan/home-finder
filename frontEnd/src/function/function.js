import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Tokenvarify = async (props) => {
    useEffect(() => {
        tokenvarifyFun();
      }, []);
      const navigate = useNavigate();
      const cookies = new Cookies();
      const token = cookies.get("token");
      
      console.log(`call api`);
      const tokenvarifyFun = async () => {
          let result = await fetch("btokenvarify", {
              method: "GET",
              headers: {
                  "content-Type": "application/json",
                  token: token,
                },
            });
            
      result = await result.json();
      if (!result.result) {
        navigate(props.render);
      }
    };
  
};

export default Tokenvarify;
