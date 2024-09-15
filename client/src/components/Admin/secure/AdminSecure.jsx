import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

export default function AdminSecure({params}) {

  console.log(params)
    
  const cookieStore = cookies();
  const token = cookieStore.get('adminToken')?.value;

  if(params="/admin"){

  }
  else{
    if (!token) {
      // If no token, redirect to login
      redirect('/admin');
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      
      // If token is valid, render the protected page
      return (
        <div>
          <h1>Welcome to your dashboard, {decoded.username}!</h1>
        </div>
      );
    } catch (error) {
      // If token is invalid or expired, redirect to login
      redirect('/admin');
    }
  }
}
