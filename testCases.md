# TEST CASES

> **Project:** Automation Exercise  
> **Framework:** Playwright

---

## Summary

| ID     | Title                                       | Feature      |
|--------|---------------------------------------------|--------------|
| TC-001 | Register User with valid data               | Registration | 
| TC-002 | Login User with correct credentials         | Login        | 
| TC-003 | Login User with incorrect credentials       | Login        | 
| TC-004 | Register User with existing email           | Registration | 
| TC-005 | Contact Us Form                             | Contact Us   | 
| TC-006 | Verify All Products and product detail page | Products     | 
| TC-007 | Add multiple products to cart               | Cart         | 
| TC-008 | Verify product quantity in cart             | Cart         | 
| TC-009 | Remove product from cart                    | Cart         | 
| TC-010 | Add review on product                       | Products     |

---

## Registration Tests (`registration.spec.js`)

---

### TC-001: Register User with valid data

| Field          | Value                                         |
|----------------|-----------------------------------------------|
| **ID**         | `TC-001`                                      |
| **Title**      | Register User with valid data                 |
| **Feature**    | Registration                                  |
| **Test File**  | `registration.spec.js`                        |
| **Test Name**  | `should register random user and delete him`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Signup / Login page
4. Home page is loaded successfully (logo is visible)

#### Steps:

| #  | Action                                                                                                        |
|----|---------------------------------------------------------------------------------------------------------------|
| 1  | Verify `New User Signup!` is visible                                                                          |
| 2  | Enter name and email address                                                                                  |
| 3  | Click `Signup` button                                                                                         |
| 4  | Verify that `ENTER ACCOUNT INFORMATION` is visible                                                            |
| 5  | Fill details: Title, Name, Email, Password, Date of birth                                                     |
| 6  | Select checkbox `Sign up for our newsletter!`                                                                 |
| 7  | Select checkbox `Receive special offers from our partners!`                                                   |
| 8  | Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number |
| 9  | Click `Create Account` button                                                                                 |
| 10 | Verify that `ACCOUNT CREATED!` is visible                                                                     |
| 11 | Click `Continue` button                                                                                       |
| 12 | Verify that `Logged in as username` is visible                                                                |
| 13 | Click `Delete Account` button                                                                                 |
| 14 | Verify that `ACCOUNT DELETED!` is visible                                                                     |
| 15 | Click `Continue` button                                                                                       |

#### Expected Result:
User is successfully registered, logged in, and account is deleted.

---

### TC-002: Login User with correct email and password

| Field          | Value                                                           |
|----------------|-----------------------------------------------------------------|
| **ID**         | `TC-002`                                                        |
| **Title**      | Login User with correct email and password                      |
| **Feature**    | Login                                                           |
| **Test File**  | `registration.spec.js`                                          |
| **Test Name**  | `should login and logout user with correct email and password`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Signup / Login page
4. Home page is loaded successfully
5. User account exists in the system

#### Steps:

| # | Action                                         |
|---|------------------------------------------------|
| 1 | Verify `Login to your account` is visible      |
| 2 | Enter correct email address and password       |
| 3 | Click `Login` button                           |
| 4 | Verify that `Logged in as username` is visible |
| 5 | Click `Logout` button                          |
| 6 | Verify that `Login to your account` is visible |

#### Expected Result:
User is successfully logged in and logged out.

---

### TC-003: Login User with incorrect email and password

| Field          | Value                                                      |
|----------------|------------------------------------------------------------|
| **ID**         | `TC-003`                                                   |
| **Title**      | Login User with incorrect email and password               |
| **Feature**    | Login                                                      |
| **Test File**  | `registration.spec.js`                                     |
| **Test Name**  | `should not login user with incorrect email and password`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Signup / Login page
4. Home page is loaded successfully

#### Steps:

| # | Action                                                         |
|---|----------------------------------------------------------------|
| 1 | Verify `Login to your account` is visible                      |
| 2 | Enter incorrect email address and password                     |
| 3 | Click `Login` button                                           |
| 4 | Verify error `Your email or password is incorrect!` is visible |

#### Expected Result:
Error message is displayed and user is not logged in.

---

### TC-004: Register User with existing email

| Field          | Value                                           |
|----------------|-------------------------------------------------|
| **ID**         | `TC-004`                                        |
| **Title**      | Register User with existing email               |
| **Feature**    | Registration                                    |
| **Test File**  | `registration.spec.js`                          |
| **Test Name**  | `should not register user with existing email`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Signup / Login page
4. Home page is loaded successfully
5. User account with the same email already exists in the system

#### Steps:

| # | Action                                                 |
|---|--------------------------------------------------------|
| 1 | Verify `New User Signup!` is visible                   |
| 2 | Enter name and already registered email address        |
| 3 | Click `Signup` button                                  |
| 4 | Verify error `Email Address already exist!` is visible |

#### Expected Result:
Error message is displayed and user is not registered.

---

## Contact Tests (`contact.spec.js`)

---

### TC-005: Contact Us Form

| Field          | Value                                                            |
|----------------|------------------------------------------------------------------|
| **ID**         | `TC-005`                                                         |
| **Title**      | Contact Us Form                                                  |
| **Feature**    | Contact Us                                                       |
| **Test File**  | `contact.spec.js`                                                |
| **Test Name**  | `should successfully send the message through the contact form`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Contact Us page
4. Contact Us page is loaded successfully

#### Steps:

| # | Action                                                                                      |
|---|---------------------------------------------------------------------------------------------|
| 1 | Verify `GET IN TOUCH` is visible                                                            |
| 2 | Enter name, email, subject and message                                                      |
| 3 | Upload file                                                                                 |
| 4 | Click `Submit` button                                                                       |
| 5 | Accept the alert dialog                                                                     |
| 6 | Verify success message `Success! Your details have been submitted successfully.` is visible |
| 7 | Click `Home` button                                                                         |
| 8 | Verify that landed to home page successfully                                                |

#### Expected Result:
Message is successfully sent, user is redirected to home page.

---

## Products Tests (`products.spec.js`)

---

### TC-006: Verify All Products and product detail page

| Field          | Value                                                |
|----------------|------------------------------------------------------|
| **ID**         | `TC-006`                                             |
| **Title**      | Verify All Products and product detail page          |
| **Feature**    | Products                                             |
| **Test File**  | `products.spec.js`                                   |
| **Test Name**  | `should product card and information to be visible`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Products page
4. Products page is loaded successfully

#### Steps:

| # | Action                                                                                                 |
|---|--------------------------------------------------------------------------------------------------------|
| 1 | Verify that the products list is visible                                                               |
| 2 | Click on `View Product` of first product                                                               |
| 3 | Verify user is landed to product detail page                                                           |
| 4 | Verify that product details are visible: product name, category, price, availability, condition, brand |

#### Expected Result:
Products page is displayed, product detail page shows all required information.

---

### TC-007: Add multiple products to cart

| Field          | Value                          |
|----------------|--------------------------------|
| **ID**         | `TC-007`                       |
| **Title**      | Add multiple products to cart  |
| **Feature**    | Cart                           |
| **Test File**  | `products.spec.js`             |
| **Test Name**  | `should add products to cart`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Products page
4. Products page is loaded successfully

#### Steps:

| # | Action                                            |
|---|---------------------------------------------------|
| 1 | Hover over first product and click `Add to cart`  |
| 2 | Click `Continue Shopping` button                  |
| 3 | Hover over second product and click `Add to cart` |
| 4 | Click `View Cart` button                          |
| 5 | Verify both products are added to Cart            |
| 6 | Verify their prices, quantity and total price     |

#### Expected Result:
Both products are displayed in cart with correct prices, quantity and total.

---

### TC-008: Verify product quantity in cart

| Field          | Value                                                              |
|----------------|--------------------------------------------------------------------|
| **ID**         | `TC-008`                                                           |
| **Title**      | Verify product quantity in cart                                    |
| **Feature**    | Cart                                                               |
| **Test File**  | `products.spec.js`                                                 |
| **Test Name**  | `should add ${quantity} products at position ${position} to cart`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Products page
4. Products page is loaded successfully

#### Steps:

| # | Action                                                            |
|---|-------------------------------------------------------------------|
| 1 | Click `View Product` for any product on home page                 |
| 2 | Verify product detail is opened                                   |
| 3 | Increase quantity                                                 |
| 4 | Click `Add to cart` button                                        |
| 5 | Click `View Cart` button                                          |
| 6 | Verify that product is displayed in cart page with exact quantity |

#### Expected Result:
Product is displayed in cart with correct quantity.

---

### TC-009: Remove product from cart

| Field         | Value                              |
|---------------|------------------------------------|
| **ID**        | `TC-009`                           |
| **Title**     | Remove product from cart           |
| **Feature**   | Cart                               |
| **Test File** | `products.spec.js`                 |
| **Test Name** | `should delete product from cart`  |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Products page
4. Products page is loaded successfully

#### Steps:

| # | Action                                                 |
|---|--------------------------------------------------------|
| 1 | Hover over first product and click `Add to cart`       |
| 2 | Click `Cart` button                                    |
| 3 | Verify that cart page is displayed                     |
| 4 | Click `X` button corresponding to particular product   |
| 5 | Verify that product is removed from the cart           |

#### Expected Result:
Product is successfully removed from cart.

---

### TC-010: Add review on product

| Field          | Value                                                       |
|----------------|-------------------------------------------------------------|
| **ID**         | `TC-010`                                                    |
| **Title**      | Add review on product                                       |
| **Feature**    | Products                                                    |
| **Test File**  | `products.spec.js`                                          |
| **Test Name**  | `should add review on product with correct name and e-mail` |

#### Preconditions:
1. Browser is launched
2. User is on the home page (`http://automationexercise.com`)
3. User navigated to Products page
4. Products page is loaded successfully

#### Steps:

| # | Action                                                         |
|---|----------------------------------------------------------------|
| 1 | Click on `View Product` button                                 |
| 2 | Verify `Write Your Review` is visible                          |
| 3 | Enter name, email and review                                   |
| 4 | Click `Submit` button                                          |
| 5 | Verify success message `Thank you for your review.` is visible |

#### Expected Result:
Review is successfully submitted.

---