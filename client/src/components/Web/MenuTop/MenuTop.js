import React,{useState,useEffect} from 'react';
import {Menu } from "antd";
import {Link} from "react-router-dom";
import logo from "../../../assets/images/png/LogoMenuTop.png"
import MenuItem from 'antd/lib/menu/MenuItem';
import {getMenuApi} from "../../../api/menu";
import SocialLinks from "../SocialLinks"

import "./MenuTop.scss"

export default function MenuTop(){

    const [menuData, setmenuData] = useState([]);

   useEffect(() =>{
        getMenuApi().then(response =>{
          
            const activeMenus = [];

            response.menu.forEach( item =>{
                if(item.active){
                    activeMenus.push(item);
                }
            })

            setmenuData(activeMenus);
        })
   },[])
   return (
        <Menu className="menu-top" mode="horizontal">
            <Menu.Item className="menu-top-logo">
                <Link to={"/"}>
                    <img src={logo} alt="Antonio Ramirez"/>
                </Link>
            </Menu.Item>

            {menuData.map(item =>{
                const externalUrl = item.url.indexOf("http") > -1 ? true : false;

                if(externalUrl){
                    return(
                        <Menu.Item key={item._id} className="menu-top-item">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        </Menu.Item>
                    );
                }

                return(
                    <Menu.Item key={item._id} className="menu-top-item">
                      <Link to={item.url}>{item.title}</Link>
                  </Menu.Item>
                    )
            })}



           <SocialLinks/>
        </Menu>
        
        )
}