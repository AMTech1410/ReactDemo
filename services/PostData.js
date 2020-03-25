
export function PostData(type,userData){

//let BaseUrl="http://192.168.1.99/API/index.php/webservice/";
let BaseUrl="BackENDUrl";

return new Promise((resolve,reject) => {

	 fetch((BaseUrl+type),{

	 	method:'POST',
	 	body:JSON.stringify(userData)
	 })
    .then((response) => response.json())
    .then((responseJson) => {
      resolve(responseJson);
    })
    .catch((error) => {
      reject(error);
    });


});

}