const interval = setInterval(() => {

    (async () => {





     //userData.user.date_subcription;

     const userData = await getUserData();

     let url = 'https://mobile.maadsene.com/api/auth/getUser?id='+userData.user.id;

     try {
 
       await fetch(url, {
         method: "GET",
         headers: {
           Accept: "application/json, text/plain, */*",
           // "Content-Type": "application/json",
           Authorization: "Bearer " + userData.token,
         },
       })
         .then(response => response.json())
         .then(data => {
           //alert(data);
 
           //let data1 = JSON.stringify(data);

           //console.log(data.user.subcription);


           let today = new Date();
           let end_date_subcription  = new Date(data.user.end_date_subcription);

           if(today < end_date_subcription){

              console.log("bonnnnnnnnnnnnnnnnnnnn");
             dispatch(saveRegistration(true));
    
            }else{
              dispatch(saveRegistration(false));
              console.log("mauvaissssssssssss");
            }

           //AsyncStorage.setItem('dataAppDB', data1);
           return data;
         });
     } catch (e) {
       if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {
 
         alert(e);
         //actions.logout();
       }
 
     }



     

     //console.log("ridd",today);

     //console.log("ridd11111111",end_date_subcription);
     //if()



     
     
   })(); 

   //alert("----useEffect---setInterval-----"+isSubscription);


 }, 300000);
 return () => clearInterval(interval);