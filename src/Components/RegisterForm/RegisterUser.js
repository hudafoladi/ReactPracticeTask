import React, { useCallback, useState, useEffect } from 'react';
import './registerformstyle.css';
import InputField from '../InputField/InputField';
import { TbEyeOff, TbEyeFilled } from 'react-icons/tb';
import 'bootstrap/dist/css/bootstrap.min.css';
const RegisterUser = ({ onSendUser, lastId, userList, editRow, setEditRow, toEdit, setToEdit }) => {
  console.log("edit row ", toEdit);
  //show or hide the register form
  // let [toggleForm, setToggle] = useState(false)
  //==============================================
  //show or hide password
  const [showPassword, setshowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const handleShowPassClick = () => {
    setshowPassword(!showPassword)
  }
  const handleShowConfirmPassClick = () => {
    setshowConfirmPassword(!showConfirmPassword)
  }
  //==============================================
  const clearData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  function formDataOutput() {
    console.log(formData.firstName, formData.lastName, formData.email, formData.password, formData.confirmPassword);

    // Checking if any is empty
    if (formData.firstName.length === 0 || formData.lastName.length === 0 || formData.email.length === 0 || formData.password.length === 0 || formData.confirmPassword.length === 0) {
      alert('Invalid Form! Field is empty.')
      return
    }
    //==============================================
    //Validating email using regex
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!formData.email || regex.test(formData.email) === false) {
      alert('Invalid email format!')
      return
    }
    //==============================================
    // Validations on password
    //Checking if password and confirmPassword are equal
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password fields have different values!')
      return
    }
    //Checking password length
    if (formData.password.length < 8) {
      alert(
        'Invalid Form! Password must have at least 8 characters.',
      )
      return
    }
    //Checking characters in password
    let totalUpperCases = 0
    let totalLowerCases = 0
    let digitCount = 0
    let totalSpecialCharacters = 0
    for (let i = 0; i < formData.password.length; i++) {
      const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>']
      if (specialChars.includes(formData.password[i])) {
        totalSpecialCharacters++
      } else if (!isNaN(formData.password[i] * 1)) {
        // isNaN -> is Not a Number
        digitCount++
      } else {
        if (formData.password[i] === formData.password[i].toUpperCase()) {
          totalUpperCases++
        }
        if (formData.password[i] === formData.password[i].toLowerCase()) {
          totalLowerCases++
        }
      }
    }
    if (totalLowerCases === 0) {
      alert('Invalid Form! Password must include a lower case character.')
      return
    }
    if (totalUpperCases === 0) {
      alert('Invalid Form! Password must include a upper case character.')
      return
    }
    if (digitCount === 0) {
      alert('Invalid Form! Password must include a digit.')
      return
    }
    if (totalSpecialCharacters === 0) {
      alert('Invalid Form! Password must include a special character.')
      return
    }
    //==============================================
    const userInfo = {
      id: (toEdit === false) ? lastId + 1 : editRow.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }
    if (toEdit === true) {
      console.log("ID of row being replaced: ", editRow.id)
      userList.splice(editRow.id - 1, 1, userInfo)
    } else {
      onSendUser(userInfo);
    }
    setFormData(clearData);
    setToEdit(false);
    setEditRow(clearData);
    // setToggle(!toggleForm);
  }
  const handleFormField = (event) => {
    const { name, value } = event
    setFormData(prev => ({ ...prev, [name]: value }))
    // check if name === confirmpassword
    // take value of password and match with confirmpass
    // if equal, no error
    // else  a new bool local state = true (by default false)
    //send as prop to iserror of confirmpass
  }
  const handleUserUpdate = useCallback(() => {
    if (toEdit === true) {
      setFormData(
        {
          formData,
          firstName: editRow.firstName,
          lastName: editRow.lastName,
          email: editRow.email,
          password: editRow.password,
          confirmPassword: editRow.password
        });
    }
  }, [editRow]);
  useEffect(() => {
    handleUserUpdate();
  }, [handleUserUpdate]);

  return (
    <>
      <div className="form">
        <div className="header">Register</div>
        <div className="form-body">
          <div className="username">
            <InputField
              id="firstName"
              labelText="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              //{(toEdit===false) ? formData.firstName : editRow.firstName}
              placeholder="First Name"
              handleChange={handleFormField} />
          </div>
          <div className="lastname">
            <InputField
              id="lastName"
              labelText="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              handleChange={handleFormField} />
          </div>
          <div className="email">
            <InputField
              id="email"
              labelText="Email"
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email"
              handleChange={handleFormField}
            />
          </div>
          <div className="password">
            <InputField
              id="password"
              labelText="Password"
              type={(showPassword === false) ? "password" : "text"}
              name="password"
              value={formData.password}
              placeholder="Password"
              handleChange={handleFormField} />
            <div className='show-hide-pass'>
              <section className='text'>
                Show/Hide
              </section>
              <section className='icon'>
                {
                  (showPassword === false) ?
                    <TbEyeFilled onClick={handleShowPassClick} /> : <TbEyeOff onClick={handleShowPassClick} />
                }
              </section>
            </div>
          </div>
          <div className="confirm-password">
            <InputField
              id="confirmPassword"
              labelText="Confirm Password"
              type={(showConfirmPassword === false) ? "password" : "text"}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              handleChange={handleFormField}
            />
            <div className='show-hide-pass'>
              <section className='text'>
                Show/Hide
              </section>
              <section className='icon'>
                {
                  (showConfirmPassword === false) ?
                    <TbEyeFilled onClick={handleShowConfirmPassClick} /> : <TbEyeOff onClick={handleShowConfirmPassClick} />
                }
              </section>
            </div>

          </div>
        </div>
        <div className="footer">
          <button onClick={() => formDataOutput()} type="submit" className="form__button">Submit</button>
        </div>
      </div>
    </>
  )
}
export default RegisterUser