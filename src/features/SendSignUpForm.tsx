import axios, { AxiosError, AxiosResponse } from "axios";

const SendSignUpForm = async (values: any) => {
  const bodyFormData = new FormData();
  bodyFormData.append("email", values.email);
  bodyFormData.append("password", values.password);
  bodyFormData.append("username", values.username);
  bodyFormData.append("phone", values.phone);
  bodyFormData.append("website", values.website);
  bodyFormData.append("intro", values.intro);
  bodyFormData.append("gender", values.gender);

  axios
    .post("api/signup", bodyFormData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response: AxiosResponse) => {
      alert(response.data.message);
    })
    .catch((error: AxiosError) => {
      alert(JSON.stringify(error.response?.data));
      console.log(error);
    });
};

export { SendSignUpForm };
