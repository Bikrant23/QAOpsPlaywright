# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: LoginPagePractiseFlow.spec.js >> @web LoginPage Practise flow navigates to shop and shows iPhone X
- Location: tests\LoginPagePractiseFlow.spec.js:4:1

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('button:has-text(\'Sign In\')')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]: rahulshettyacademy
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]: learning
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [checked] [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [checked] [active] [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | 
  3  | class LoginPagePractisePage {
  4  | 
  5  |   constructor(page) {
  6  |     this.page = page;
  7  | 
  8  |     this.username = page.locator("input[name='username']");
  9  |     this.password = page.locator("input[name='password']");
  10 |     this.checkbox = page.locator("input[type='checkbox']");
  11 |     this.signInButton = page.locator("button:has-text('Sign In')");
  12 |     this.productCards = page.locator('.card');
  13 |     this.iphoneXProduct = page.locator('.card').filter({ hasText: 'iphone X' });
  14 |   }
  15 | 
  16 |   async gotoLoginPage() {
  17 |     await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  18 |   }
  19 | 
  20 |   async login(username, password) {
  21 |     await this.username.fill(username);
  22 |     await this.password.fill(password);
  23 |     await this.checkbox.check();
> 24 |     await this.signInButton.click();
     |                             ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  25 |     await this.page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop', { timeout: 20000 });
  26 |   }
  27 | 
  28 |   async verifyIphoneXProduct() {
  29 |     await expect(this.iphoneXProduct).toBeVisible();
  30 |   }
  31 | }
  32 | 
  33 | module.exports = LoginPagePractisePage;
  34 | 
```