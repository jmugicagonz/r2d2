"use client"
import * as React from 'react';
import Image from 'next/image';
import DrawerLeft from "../components/base-ui/DrawerLeft"
import Menu from "../components/base-ui/Menu"
import {menuItems} from "@/app/head-bar/menuItems"


//<SvgIcon component={googleCloudLogo} inheritViewBox/>
function HomeIcon() {
  return (
    <DrawerLeft 
        button={<Image src="/google_cloud-icon.svg" alt="logoGCP" 
          width={40}
          height={40}
        />}
        content={<Menu items={menuItems}/>}
    />
  );
}
export default HomeIcon;
