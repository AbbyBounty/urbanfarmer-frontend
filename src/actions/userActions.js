import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/userConstants'
import axios from 'axios'
require('dotenv').config()

const host = process.env.REACT_APP_API_URL+":4000";
console.log("🚀 ~ file: userActions.js ~ line 14 ~ host", host)



export const logout = () => {
  return (dispatch) => {
    sessionStorage.removeItem('token')
    dispatch({ type: USER_SIGNOUT })
    document.location.href = '/'
  }
}

export const signup = (firstName, lastName, email, mobileNo, password) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = {
      firstName,
      lastName,
      email,
      mobileNo,
      password,
    }
    const url = `${host}/users/signup`
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: error,
        })
      })
  }
}

export const signin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
    }

    const body = {
      email,
      password,
    }
    const url = `${host}/users/signin`

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error,
        })
      })
  }
}
