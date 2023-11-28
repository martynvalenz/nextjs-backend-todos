'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const {data:session} = useSession();

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <h1>Hello Page</h1>
      <hr/>

      <div className="flex flex-col">
        <span>{session?.user?.name ?? 'No Name, como el baresito'}</span>
        <span>{session?.user?.email ?? 'No Email'}</span>
        <span>{session?.user?.image ?? 'No image'}</span>
        <span>{session?.user?.id ?? 'No uuid'}</span>
        <span className="capitalize">{session?.user?.roles?.join(', ') ?? ['No roles']}</span>
      </div> 
    </div>
  );
}