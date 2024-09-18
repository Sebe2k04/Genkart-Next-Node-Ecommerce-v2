# Genkart-Ecommerce

Genkart is an e-commerce project designed to showcase my development skills and proficiency in modern web technologies. This platform is used to sell casuals and T-shirts, with essential e-commerce functionalities like product management, user authentication, and more.
Genkart is a Ecommerce project to showcase my skills through the tech world .

## technologies used

this project is developed by using
_ Next js
_ Node js
_ Express js
_ MongoDB
_ Tailwind css
_ Cloudinary
_ Material UI
_ Material Tailwind
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
EMAIL_PASS="vivh ztpd snny zjjn"
# client url
CLIENT_URL="http://localhost:3000"
# node environment
NODE_ENV="production"
# cloudinary name
CLOUDINARY_CLOUD_NAME="ded1o1e26"
# cloudinary api key
CLOUDINARY_API_KEY="674375379427488"
# cloudinary secret key
CLOUDINARY_API_SECRET="4V1jQwEEB4SR0H0f4PlqMKq9G8M"
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
