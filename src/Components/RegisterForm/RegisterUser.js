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
      alert('Invalid Form! A field is empty.')
      return
    }
    //==============================================
    //Validating email
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
    let countUpperCase = 0
    let countLowerCase = 0
    let countDigit = 0
    let countSpecialCharacters = 0
    for (let i = 0; i < formData.password.length; i++) {
      const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>']
      if (specialChars.includes(formData.password[i])) {
        // if the character is special increment countSpecialCharacters
        countSpecialCharacters++
      } else if (!isNaN(formData.password[i] * 1)) {
        // if the character is a digit increment countDigit
        countDigit++
      } else {
        if (formData.password[i] === formData.password[i].toUpperCase()) {
          // if the character is upper case increment countUpperCase
          countUpperCase++
        }
        if (formData.password[i] === formData.password[i].toLowerCase()) {
          // if the character is lowercase increment countUpperCase
          countLowerCase++
        }
      }
    }
    if (countLowerCase === 0) {
      alert('Invalid Form! Password must include a lower case character.')
      return
    }
    if (countUpperCase === 0) {
      alert('Invalid Form! Password must include a upper case character.')
      return
    }
    if (countDigit === 0) {
      alert('Invalid Form! Password must include a digit.')
      return
    }
    if (countSpecialCharacters === 0) {
      alert('Invalid Form! Password must include a special character.')
      return
    }
    //==============================================
    
    const userInfo = {
      id: (toEdit===false)? lastId + 1 : editRow.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }
    if(toEdit === true){
      console.log("ID of row being replaced: ", editRow.id)
      userList.splice(editRow.id -1, 1, userInfo)
    }else{
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
              //{(toEdit===false) ? formData.lastName : editRow.lastName}
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
              //{(toEdit===false) ? formData.email : editRow.email}
              placeholder="Email"
              handleChange={handleFormField}
            />
          </div>
          <div className="password">
            <div className="pass-icon-wrap">
              <InputField
                className="pass__inputwithicon"
                id="password"
                labelText="Password"
                type={(showPassword === false) ? "password" : "text"}
                name="password"
                value={formData.password}
                //{(toEdit === false) ? formData.password : editRow.password}
                placeholder="Password"
                handleChange={handleFormField} />
              <div className="pass__icon">
                {
                  (showPassword === false) ?
                    <TbEyeFilled onClick={handleShowPassClick} /> : <TbEyeOff onClick={handleShowPassClick} />
                }
              </div>
            </div>
          </div>
          <div className="confirm-password">
            <InputField
              id="confirmPassword"
              labelText="Confirm Password"
              type={(showConfirmPassword === false) ? "password" : "text"}
              name="confirmPassword"
              value={formData.confirmPassword}
              //{(toEdit===false) ? formData.confirmPassword : editRow.password}
              placeholder="Confirm Password"
              handleChange={handleFormField}
            />
          </div>
          <div>
            {
              (showConfirmPassword === false) ?
                <TbEyeFilled onClick={handleShowConfirmPassClick} /> : <TbEyeOff onClick={handleShowConfirmPassClick} />
            }
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