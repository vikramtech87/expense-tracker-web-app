"use client";

import { Button } from '@/components/ui/button';
import { isResourceAvaialbale, Resource } from '@/lib/types/navigation/resource';
import { Role } from '@/lib/types/navigation/role';
import clsx from 'clsx';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Header = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  return (
    <div className="bg-muted border-b shadow">
      <div className="container py-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:justify-between">
        <Branding setIsMenuExpanded={setIsMenuExpanded}/>
        <MainNavigation userRole='User' isMenuExpanded={isMenuExpanded}/>
        <SecondaryNavigation userRole='Guest' isMenuExpanded={isMenuExpanded}/>
      </div>
    </div>
  )
}

type BrandingProps = {
  setIsMenuExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Branding = ({setIsMenuExpanded}: BrandingProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-[#c621e5] to-[#7d7cf9] text-transparent bg-clip-text hover:cursor-pointer">
        <Link href="/">ET</Link>
      </div>
      <div className="flex sm:hidden space-x-4">
        <ModeSwitch/>
        <Button variant="ghost" className='p-0' onClick={() => setIsMenuExpanded((prev) => !prev)}>
          <Menu/>
        </Button>
      </div>
      
    </div>
  );
};

type MainNavigationProps = {
  userRole: Role,
  isMenuExpanded: boolean
}

const MainNavigation = ({userRole, isMenuExpanded}: MainNavigationProps) => {
  const resources: Resource[] = [
    {
      label: "Dashboard",
      url: "/dashboard",
      allowedRoles: (new Set<Role>()).add("User")
    },
    {
      label: "Monthly Expenses",
      url: "/monthly-expenses",
      allowedRoles: (new Set<Role>()).add("User")
    },
    {
      label: "Recurrent Expenses",
      url: "/recurrent-expenses",
      allowedRoles: (new Set<Role>()).add("User")
    }
  ]

  const currentPath = usePathname();
  const filteredResources = resources.filter((res) => isResourceAvaialbale(res, userRole));

  const menuClassList = clsx({
    hidden: !isMenuExpanded,
    flex: isMenuExpanded,
    "sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 sm:items-center text-sm": true
  })

  return (
    <ul className={menuClassList}>
      {filteredResources.map((res) => {
        const isActive = res.url === currentPath;
        const itemClassList = clsx({
          "block py-1": true,
          "text-muted-foreground": !isActive,
          "text-normal": isActive,
          "font-semibold": true
        })
        return (<li key={res.label}>
          <Link href={res.url} className={itemClassList}>
            {res.label}
          </Link>
        </li>);
      })}
    </ul>
  )
}

type SecondaryNavigationProps = {
  isMenuExpanded: boolean;
  userRole: Role;
}

const SecondaryNavigation = ({isMenuExpanded, userRole}: SecondaryNavigationProps) => {
  const resources: Resource[] = [
    {
      label: "Log In",
      url: "/login",
      allowedRoles: new Set<Role>().add("Guest")
    },
    {
      label: "Register",
      url: "/register",
      allowedRoles: new Set<Role>().add("Guest")
    },
    {
      label: "Log Out",
      url: "/logout",
      allowedRoles: new Set<Role>().add("User")
    }
  ];

  const currentPath = usePathname();

  const filteredResources = resources.filter((res) => isResourceAvaialbale(res, userRole));

  const containerClassList = clsx({
    hidden: !isMenuExpanded,
    flex: isMenuExpanded,
    "sm:flex space-x-0 sm:space-x-4 md:space-x-6 sm:items-center": true
  })

  const menuClassList = clsx({
    hidden: !isMenuExpanded,
    flex: isMenuExpanded,
    "sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 text-sm": true
  })
  return (
    <div className={containerClassList}>
      <div className='hidden sm:block'>
          <ModeSwitch/>
      </div>
      <ul className={menuClassList}>
        {filteredResources.map((res) => {
          const isActive = res.url === currentPath;
          const itemClassList = clsx({
            "block py-1": true,
            "text-muted-foreground": !isActive,
            "text-normal": isActive,
            "font-semibold": true
          })
          return (<li key={res.label}>
            <Link href={res.url} className={itemClassList}>
              {res.label}
            </Link>
          </li>);
        })}
      </ul>
    </div>
  );
};

const ModeSwitch = () => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [setMounted]);

  if(!mounted) {
    return null;
  }

  if(theme === "light") {
    return (
      <Button variant="ghost" className='p-0 text-muted-foreground' onClick={() => setTheme("dark")}>
        <Moon size="16"/>
      </Button>
    );
  }

  return ( 
    <Button variant="ghost" className='p-0 text-muted-foreground' onClick={() => setTheme("light")}>
      <Sun size="16"/>
    </Button>
  );
}

export default Header;