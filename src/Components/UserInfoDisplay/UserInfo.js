import "./userliststyle.css";
const UserInfo = ({ userList, setUserList, setEditRow, setToEdit }) => (
    <> {console.log(userList)}
        <table id="userlist">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Delete/Edit</th>
                </tr>
            </thead>
            <tbody>
                {
                    userList
                        .map((user, i) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td className="delete-edit">
                                        <button className="delete__button" onClick={() => {
                                            setUserList(userList.filter(deleteuser => //to remove any items that match the id that we pass
                                                deleteuser.id !== user.id))
                                            alert("User with user id: " + Number(user.id) + " will be deleted!");
                                        }}>
                                            Delete
                                        </button>
                                        <button className="edit__button" onClick={() => {
                                            setEditRow(user);
                                            setToEdit(true);
                                            alert("User with user id: " + Number(user.id) + " will be updated!");
                                        }}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>)
                        })
                }
            </tbody>

        </table>
    </>
)
export default UserInfo
