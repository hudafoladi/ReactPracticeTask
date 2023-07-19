import { useState, useEffect, useCallback } from "react";
import "./Main.css";
import RegisterUsers from "../Components/RegisterForm/RegisterUser";
import UserInfo from "../Components/UserInfoDisplay/UserInfo";
function Main() {
  const [userList, setUserList] = useState([]);
  const [editRow, setEditRow] = useState([]);
  const [toEdit, setToEdit] = useState(false);
  console.log("Editable row: ", editRow);
  console.log("ToEdit row: ", toEdit);

  const fetchData = useCallback(() => {
    fetch("./api/getAll", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]); //track the fetchig of data any changes to the data

  return (
    <div className="Main">
      <div className="main-container">
        <section className="form-section">
          <RegisterUsers
            onSendUser={(newUser) => setUserList([...userList, newUser])}
            lastId={userList.reduce(
              (max, item) => (Number(item._id) > max ? Number(item._id) : max),
              0
            )}
            editRow={toEdit === true ? editRow : null}
            userList={userList}
            toEdit={toEdit}
            setEditRow={setEditRow}
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
