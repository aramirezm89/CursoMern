import { message } from "antd";
import { basePath, apiVersion } from "./config";

export function loginApi(data) {
  const url = `${basePath}/${apiVersion}/login`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return {
          ok: true,
          mesagge: "Usuario creado con exito",
        };
      }
      return {
        ok: false,
        message: result.message,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
      };
    });
}

export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })

    .catch((err) => {
      return err.message;
    });
}


export function getUsersApi(token){
  const url =  `${basePath}/${apiVersion}/users`;
  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    }

  };

  return fetch(url,params)
        .then(response =>{
          return response.json();
        })
        .then(result =>{
          return result;
        })
        .catch(err =>{
         return  err.message
        })

}

export function getUsersActiveApi(token,status){
  const url =  `${basePath}/${apiVersion}/users-active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    }

  };

  return fetch(url,params)
        .then(response =>{
          return response.json();
        })
        .then(result =>{
          return result;
        })
        .catch(err =>{
         return  err.message
        })

}

export function  uploadAvatarApi(token,avatar,userId){


  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  const formData = new FormData();

  formData.append("avatar",avatar,avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers:{ 
      Authorization: token
    }
  }

  return fetch(url,params).then(response =>{
    return response.json()
  }).then(result =>{
    return result;
  }).catch(err =>{
    return err.message;
  })

  
}


export function getAvatarApi(avatarName){

  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url).then( response =>{
    return response.url;
  }).catch(err =>{
    return err.message;
  })

}


export function updateUserApi(token,user,idUser){
  const url = `${basePath}/${apiVersion}/update-user/${idUser}`;
  const params = {
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(user)
   
  };

  return fetch(url,params).then(response =>{
    return response.json();
  }).then(result =>{
    return result;
  }).catch(err =>{
    return err.message;
  })

}

export function  activateUserApi(token,idUser,status){
  const url = `${basePath}/${apiVersion}/activate-user/${idUser}`;
 
  const params = {
    method:"PUT",
    headers: {
      "Content-Type" : "application/json",
      Authorization: token
    },
    body : JSON.stringify({
      active: status

    })
  };

  return fetch(url,params).then(response =>{
    return response.json();
  }).then(result=>{
    return result.message;
  }).catch(err =>{
    return err.message;
  })
}

export function deleteUserApi(token,idUser){

  const url = `${basePath}/${apiVersion}/user-delete/${idUser}`;

   const params = {

    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
      Authorization : token
    }

   }

   return fetch(url,params).then(response =>{
    return response.json();
   }).then(result =>{
     return result.message;
   }).catch(err =>{
       return  err.message;
   })

}

export function singUpAdminApi(token,data){

  const url = `${basePath}/${apiVersion}/sing-up-admin`;

  const params ={
    method: "POST",
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
      Authorization: token
    }
  }

  return fetch(url,params).then(response=>{
    return response.json();
  }).then(result =>{
    return result.message;
  }).catch(err=>{
    return err.message;
  })

 }