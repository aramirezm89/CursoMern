import React from 'react';
import{ReactComponent as YoutubeIcon} from "../../../assets/images/svg/21.2 youtube.svg";
import{ReactComponent as TwiterIcon} from "../../../assets/images/svg/21.4 twitter.svg";
import{ReactComponent as FacebookIcon} from "../../../assets/images/svg/21.1 facebook.svg";
import{ReactComponent as LinkedinIcon} from "../../../assets/images/svg/21.3 linkedin.svg";

import "./SocialLinks.scss"

export default function Socialinks (){
    return (
        
        <div className="social-links">
            <a 
              href="https://www.youtube.com/channel/UCcLyreLlPUVFae6ZtHjsH3w" 
              className="-youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
                  <YoutubeIcon/>
            </a>
          
            <a 
              href="https://twitter.com/?lang=es" 
              className="-twiter"
              target="_blank"
              rel="noopener noreferrer"
            >
                  <TwiterIcon/>
            </a>

            <a 
              href="https://www.facebook.com/antonioisaac.ramirezmonsalve/" 
              className="-facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
                  <FacebookIcon/>
            </a>

            <a 
              href="https://cl.linkedin.com/" 
              className="-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
                  <LinkedinIcon/>
            </a>

            
        </div>
        
        )    
}