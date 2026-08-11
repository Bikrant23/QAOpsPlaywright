const base = require('@playwright/test');

exports.customtest = base.test.extend ({    
    // Add any custom fixtures or extensions here if needed
    testDataForOrder: {  
        username: "kamra.k@gmail.com",
        password: "Kunal@123",
        productName: "iphone 13 pro"  
    }, 
});