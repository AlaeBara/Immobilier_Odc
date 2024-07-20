import React,{useEffect} from 'react'
import './NavBar.css'
import logo from './project-logo.png'

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
  return (
    <>
        <header class="header" data-header>

            <div class="overlay" data-overlay></div>

            {/* <div class="header-top">
                <div class="container">

                    <ul class="header-top-list">

                        <li>
                            <a href="mailto:info@homeverse.com" class="header-top-link">
                            <ion-icon name="mail-outline"></ion-icon>

                            <span>info@homeverse.com</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="header-top-link">
                            <ion-icon name="location-outline"></ion-icon>
                            <address>15/A, Nest Tower, NYC</address>
                            </a>
                        </li>

                    </ul>

                    <div class="wrapper">
                    <ul class="header-top-social-list">

                        <li>
                        <a href="#" class="header-top-social-link">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        </li>

                        <li>
                        <a href="#" class="header-top-social-link">
                            <ion-icon name="logo-twitter"></ion-icon>
                        </a>
                        </li>

                        <li>
                        <a href="#" class="header-top-social-link">
                            <ion-icon name="logo-instagram"></ion-icon>
                        </a>
                        </li>

                        <li>
                        <a href="#" class="header-top-social-link">
                            <ion-icon name="logo-pinterest"></ion-icon>
                        </a>
                        </li>

                    </ul>

                    <button class="header-top-btn">Add Listing</button>
                    </div>

                </div>
            </div> */}

            <div class="header-bottom">
                <div class="container">

                    <a href="#" class="logo">
                        <img src="https://chantiersdumaroc.ma/wp-content/uploads/2021/02/Logo-Horizontal.png" alt="Homeverse logo"/>
                    </a>

                    <nav class="navbar" data-navbar>

                        <div class="navbar-top">

                            <a href="#" class="logo">
                                <img src="https://chantiersdumaroc.ma/wp-content/uploads/2021/02/Logo-Horizontal.png" alt="Homeverse logo"/>
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII="/>
                            <span>Search</span>
                        </button>

                        <button class="header-bottom-actions-btn" aria-label="Profile">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII="/>
                            <span>Profile</span>
                        </button>

                        <button class="header-bottom-actions-btn" aria-label="Cart">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII="/>
                            <span>Cart</span>
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