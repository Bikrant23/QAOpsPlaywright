class APIUtils{

    constructor(apiContext,loginPayLoad){
        //Create Instance of a Class
        this.apiContext = apiContext; //Assigning to Local Class API Context
        this.loginPayLoad = loginPayLoad;
    }
     
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data: this.loginPayLoad,
        });
        // expect((loginResponse).ok()).toBeTruthy();
        const loginResponseJSON = await loginResponse.json();

        const token = loginResponseJSON.token;

        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                data: orderPayLoad,
                headers: {
                    'authorization' : response.token,
                    'content-type' : 'application/json', //Sometimes the response might return another format if it's not immediately explicity mention that it should be JSON.  
                },
            });
        
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            console.log(orderResponse);
            console.log(orderId);
            return response;
    }
}

module.exports = {APIUtils};