import axios from "axios";


let SendSignUpForm = async (values: any) => {
  const bodyFormData = new FormData();
  bodyFormData.append('email', values.email);
  bodyFormData.append('password', values.password);
  bodyFormData.append('userName', values.username);
  bodyFormData.append('phone', values.phone);
  bodyFormData.append('website', values.website);
  bodyFormData.append('intro', values.intro);
  bodyFormData.append('gender', values.gender);
 // console.log('bodyFormData: ', [...bodyFormData]);
  const jsonData = JSON.stringify(Object.fromEntries(bodyFormData));
 // console.log('jsonData: ', jsonData);

  let response = () => {
    return new Promise(function (resolve, reject) {
      axios
        .post(
        "api/signup",   
        jsonData,    
          {headers: {
            'Content-Type': 'application/json'
          }}
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  let responseData = await response();

  console.log(responseData);
};

export { SendSignUpForm };
