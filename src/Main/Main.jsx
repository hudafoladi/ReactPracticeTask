import { useState, useEffect, useCallback } from "react";
import "./Main.css";
import RegisterUser from "../Components/RegisterForm/RegisterUser";
import UserInfo from "../Components/UserInfoDisplay/UserInfo";
function Main() {
  const [userList, setUserList] = useState([]);
  const [editRow, setEditRow] = useState([]);
  const [toEdit, setToEdit] = useState(false);
  console.log("Editable row: ", editRow);
  console.log("ToEdit row: ", toEdit);

  const fetchData = useCallback(() => {
    fetch("./userdata.json") //anything in the public folder will appear as at the same level as your app once it has been pushed up to a server
      .then((response) => response.json()) 
      .then((data) => {
        setUserList(data);
      });
  }, []);
  //fetchAPI will allow us to retirve an element either from a local file or server
  useEffect(() => {
    //useEffect is supposed to be something like a side effect that your app does not normally worry about so this is sort of controlling react a little bit more
    fetchData();
  }, [fetchData]); //track the fetchig of data
  //we are going to use useEffect to make sure it is tracking the data and any changes to the data
 
  return (
    <div className="Main">
      <div className="main-container">
        <section className="form-section">
          <RegisterUser
            onSendUser={(newUser) => setUserList([...userList, newUser])}
            lastId={userList.reduce(
              (max, item) => (Number(item.id) > max ? Number(item.id) : max),
              0
            )}
            editRow= {
              (toEdit === true) ?
                editRow : null
            }
            userList={userList}
            toEdit={toEdit}
            setEditRow = {setEditRow}
            setToEdit={setToEdit}
          />
        </section>
        <section className="list-section">
          {
            <UserInfo
              userList={userList}
              setUserList={setUserList}
              setEditRow={setEditRow}
              setToEdit={setToEdit}
            /> 
          }
        </section>
      </div>
    </div>
  );
}
export default Main;
