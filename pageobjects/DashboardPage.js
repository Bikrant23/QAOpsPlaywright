class DashboardPage {

    constructor(page) {
       
        this.page = page;

        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");       
        this.cart = page.locator("[routerlink*='cart']");
        

    }

    async searchProduct(productName){
       
        await this.productsText.first().waitFor();
        console.log(await this.productsText.first().textContent());

        //Get all the Products in the List Format
        const allTitles = await this.productsText.allTextContents(); //Returns a list of all the tiles in an Array.
        console.log(allTitles);    

        //Find ZARA COAT 3 Product and Click on Add to Cart Button
        const count = await this.products.count();
        for(let i=0; i<count; ++i)
        {
            if(await this.products.nth(i).locator("b").textContent() === productName)
            {
                //Add the desired Product to Cart by Clicking on the Add to Cart Button
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cart.click();
    }
}

module.exports = DashboardPage;
