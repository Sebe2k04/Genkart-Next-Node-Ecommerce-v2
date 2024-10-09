# Genkart-Ecommerce

<img src="./readme-assets/herosc.png" alt="" />


Genkart is a sophisticated e-commerce platform designed to demonstrate a wide range of web development skills. Unlike traditional e-commerce sites, Genkart intentionally omits payment and "Buy Now" options, focusing instead on the user experience, product management, and robust backend functionality. The project is built using cutting-edge technologies and frameworks to ensure scalability, performance, and maintainability.

### Tech Stack Overview:

Frontend: Built with Next.js, a powerful React-based framework that supports server-side rendering and static site generation, enhancing both performance and SEO.

Backend: Powered by Node.js and Express.js, providing a flexible and efficient environment for handling API requests and managing server-side logic.

Database: Utilizes MongoDB, a NoSQL database, for storing product information, user data, and other critical information. The schema-less nature of MongoDB allows for rapid development and flexibility in data management.

Image Management: Cloudinary is integrated for efficient image storage and delivery, offering responsive images and optimized media assets across the platform.

Styling: The user interface is styled with Tailwind CSS and Material UI, combining the utility-first approach of Tailwind with the component-rich Material UI to create a visually appealing and responsive design. Material Tailwind further enhances the design with additional UI components.

### Key Features:

Authentication & Authorization:

Secure user authentication and role-based authorization are implemented using JWT (JSON Web Tokens). This ensures that only authenticated users can access certain features, with secure token exchange managed via cookies.
The platform supports user roles such as admin and customer, each with specific access levels and permissions.

Product Management:

Product Pages: Each product category, such as T-shirts and casual shirts, has dedicated pages. These pages dynamically display products pulled from the database, with detailed information and images stored via Cloudinary.
Category Pages: Users can browse products by categories, which are organized to provide a seamless shopping experience.
User Profile:

The profile page allows users to manage their personal information, view their browsing history, and update account settings. It is a hub for user-specific interactions, designed to be intuitive and user-friendly.

Admin Panel:

The admin dashboard is a critical feature of Genkart, empowering administrators to perform CRUD (Create, Read, Update, Delete) operations on products, categories, and user accounts. This panel is designed with security in mind, ensuring that only authorized admins can make changes to the platform’s content.

### Project Objectives:

Genkart is not just a showcase of products; it is a demonstration of full-stack web development skills. By integrating modern technologies and best practices, this project serves as a portfolio piece, illustrating the ability to build scalable, maintainable, and user-friendly applications. The project also highlights proficiency in handling complex authentication mechanisms, managing media assets efficiently, and designing responsive and interactive user interfaces.

### Potential Future Enhancements:

Although the current version of Genkart does not include payment and "Buy Now" options, it is architected to easily integrate these features in the future. Possible enhancements include:

Payment Gateway Integration: Adding secure payment processing with popular gateways like Razorpay or Stripe.
Shopping Cart: Implementing a fully functional shopping cart to manage user selections.
Order Management: Developing an order management system to track purchases and handle user orders efficiently.

## Technologies used ...

this project is developed by using

- Next js
- Node js
- Express js
- MongoDB
- Tailwind css
- Cloudinary
- Material UI
- Material Tailwind
  etc...

## How to use

### requirements

create a mongodb atlas account : https://www.mongodb.com/products/platform/atlas-database

create a cloudinary account : https://cloudinary.com/

use visual studio code editor : https://code.visualstudio.com/download

intall git
for windows : https://git-scm.com/download/win
for mac : https://git-scm.com/download/mac

install node js : https://nodejs.org/en/download/package-manager

### get code from github

create a folder and open in visual studio code

open new terminal in vs code then run below command

```bash
git clone https://github.com/Sebe2k04/Genkart-Next-Node-Ecommerce-v2.git ./
```

then provide env files provided below

### Environment Variables

initially create a env file in root folder of next js - location (/client/.env)

important note : you can provide jwt secret based on you wish but provide same secret value for client and server

```bash

# backend url
NEXT_PUBLIC_API='http://localhost:5000/api'
# frontend url
NEXT_PUBLIC_CLIENT_URL="http://localhost:5000/"
# jwt secret for verify user - replace as per you wish -same as backend
NEXT_PUBLIC_JWT_SECRET="adminfksnkzv"
# jwt secret value for verify admin- replace as per you wish -same as backend
NEXT_PUBLIC_JWT_USER_SECRET="usernsdbdskvn"
NEXT_PUBLIC_NODE_ENV="development"

```

after that create a env file in root folder of server - location (/server/.env)

```bash
# your mongodb uri - replace username and password and provide yours

MONGO_DB_URI="mongodb+srv://username:password@project.wvpqroq.mongodb.net/genkartv2?retryWrites=true&w=majority&appName=project"
# gmail to send mail to users for reset password
EMAIL_USER="genriotesting@gmail.com"
# gmail app password to provide access to send emails --for info search how to send mail use nodemailer in node js
EMAIL_PASS="vivh ztpd snny zjda"
# client url
CLIENT_URL="http://localhost:3000"
# node environment
NODE_ENV="production"
# cloudinary name
CLOUDINARY_CLOUD_NAME=""
# cloudinary api key
CLOUDINARY_API_KEY=""
# cloudinary secret key
CLOUDINARY_API_SECRET=""
# cloudinary folder name to store files in specific folder
CLOUDINARY_FOLDER_NAME="Genkartv2"
# jwt secret to encode and decode admin token between client and server -provide same value as frontend
JWT_SECRET="adminfksnkzv"
# jwt secret to encode and decode user token between client and server -provide same value as frontend
JWT_USER_SECRET="usernsdbdskvn"
# jwt expiration
JWT_EXPIRES_IN="1d"
```

### how to run it

note : initially the website will be blank because no user , admin or products are not in you database

create two terminals in vs code

in first one

```bash
cd server
npm install
npm start
```

in second one

```bash
cd client
npm install
npm run dev
```

Now you have running your frontend and backend
all the running url will be displayed on respective terminal

### create admin user

Important note :

initially go to below file

/server/routes/authRoutes.js

then uncomment the admin signup route

--

note i didn't provide admin signup ui , due to secure concerns . after create admin comment the respective route in server auth route - (admin signup)

open postman

then create new workspace

then provide url backend url with respective route
for example : if you running in localhost 5000

http://localhost:5000/api/auth/admin/signup

<img src="./readme-assets/postman.png" alt="" />

after that you got a response similar like above image

then in frontend url login with respective email and password to gain access to admin dashboard in ,

http://localhost:3000/admin

then you can add and remove products in admin dashboard

# project authority

this project is developed only by @sebe2k04 , if you have any queries contact me on ,

github :

https://github.com/Sebe2k04

linked in :

https://www.linkedin.com/in/sebe2k04/

gmail :

sebe2k04@gmail.com

website:

https://sebe2k04.vercel.app/

this project is developed only by myself - sebe , to showcase my developing skills , im a fresher and im currently looking full time job oppurtunities , thank you all...
