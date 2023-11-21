import axios from 'axios';

const SendLogInForm = async () => {
  const {data} = await axios.post('127.0.0.1:8080/api/LogIn', {
    email: '',
    password: ''
  },{
    headers:{
      'Content-Type': 'multipart/formdata'
    }
  })

  return data;
};

export {SendLogInForm}