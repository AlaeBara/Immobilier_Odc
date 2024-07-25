import React from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import logo from './logooo.png'

const NavBar = () => {
    const toggleNavbar = () => {
        const navbar = document.querySelector("[data-navbar]");
        const overlay = document.querySelector("[data-overlay]");
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
    };
    
    const handleScroll = () => {
        const header = document.querySelector("[data-header]");
        if (window.scrollY >= 400) {
          header.classList.add("active");
        } else {
          header.classList.remove("active");
        }
    };
    
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8000/logout',{withCredentials:true});
            navigate('/'); 
        } catch (error) {
            console.error('Logout failed:', error);
            alert("Logout failed");
        }
    };


    
  return (
    <>
        <header class="header" data-header>

            <div class="overlay" data-overlay></div>

        
            <div class="header-bottom">
                <div class="container">

                    <a href="#" class="logo">
                        <img src={logo} alt="Homeverse logo"/>
                    </a>

                    <nav class="navbar" data-navbar>

                        <div class="navbar-top">

                            <a href="#" class="logo">
                                <img src={logo} alt="Homeverse logo"/>
                            </a>

                            <button class="nav-close-btn" onClick={toggleNavbar} aria-label="Close Menu">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjklEQVR4nO2VQQ6AIAwE5xNL5In6XDn4HL1gYggqrXBzTxzYnQZagF8OzUBw+EL2PmoBdiAZISF79pxxKwFr3rgBsSG89ExWQ+wZboHIG94C0dfwJ4h6hdc6JBVrTztXpUvV3Sp/A8Re4WHkEalyoZ5hbA4/9RnS0oryQix9LivEM0SyQIY/18M/nF+UOgAHtlaIDLPnzAAAAABJRU5ErkJggg=="/>
                            </button>

                        </div>

                        <div class="navbar-bottom">

                            
                            <ul class="navbar-list">

                            <li>
                                <a href="#home" class="navbar-link" data-nav-link>Home</a>
                            </li>

                            <li>
                                <a href="#about" class="navbar-link" data-nav-link>About</a>
                            </li>

                            <li>
                                <a href="#service" class="navbar-link" data-nav-link>Service</a>
                            </li>

                            <li>
                                <a href="#property" class="navbar-link" data-nav-link>Property</a>
                            </li>

                            <li>
                                <a href="#blog" class="navbar-link" data-nav-link>Blog</a>
                            </li>

                            <li>
                                <a href="#contact" class="navbar-link" data-nav-link>Contact</a>
                            </li>

                            </ul>
                        </div>

                    </nav>

                    <div class="header-bottom-actions">

                        <button class="header-bottom-actions-btn" aria-label="Search">
                            <a href="/user/profile">
                                <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/user-male-circle.png" alt="user-male-circle"/>
                            </a>
                            <span>Profile</span>
                        </button>
                        <button class="header-bottom-actions-btn" aria-label="Search">
                            <a onClick={handleLogout}>
                                <img width="30" height="30" src="https://img.icons8.com/sf-regular/48/exit.png" alt="user-male-circle"/>
                            </a>
                            <span>Log out</span>
                        </button>

                        <button class="header-bottom-actions-btn" onClick={toggleNavbar} data-nav-open-btn aria-label="Open Menu">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII="/>
                            <span>Menu</span>
                        </button>


                    </div>

                </div>
            </div>

        </header>
    
    
    
    
    
    

    
    </>
  )
}

export default NavBar