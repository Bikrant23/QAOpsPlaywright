class LoginPage {

    constructor(page) {
        // Initialize page elements or state here
        this.page = page;

        this.loginButton = page.locator("#login"); 
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async landOnLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
    }

    //Write a reusable utility to Login
    async validLogin(userEmail, password) {

        await this.email.fill(userEmail);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};
 