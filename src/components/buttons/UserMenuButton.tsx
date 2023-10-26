'use client';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

type UserMenuButtonProps = {
  session: Session | null;
}

const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;
  
  const profileImageHolder: string = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=1931&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ?
          (<Image
            src={user?.image || profileImageHolder}
            alt={user?.name || 'User Profile'}
            height={40}
            width={40}
            className='rounded-full object-cover w-10'
            />) :
          (<div className='w-10 flex justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="currentColor">
              <path d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"/>
            </svg>
          </div>)
        }
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm mt-3 z-30 w-52 bg-base-100 p-2 shadow">
          <li>
            {user? 
              (<button onClick={() => {signOut({callbackUrl: '/'})}}>Sign Out</button>)
              :
              (<button onClick={() => {signIn()}}>Log In</button>)
            }
          </li>
      </ul>
    </div>
  )
}

export default UserMenuButton;