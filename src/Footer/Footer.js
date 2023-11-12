import style from "./footer.module.css"

const Footer=()=>{
    return(
        <footer className={style.footer}>
        <h3>Book'sKeep</h3>
        <p>Fill your house with stacks of books, in all the crannies and all the nooks.</p>
        <p>Contact Us</p>
        <div className={`${style.socials} ${style.footerlink}`}>
                <li><a target="_blank" href="https://twitter.com/satyams12084157"><i className="fa fa-twitter"></i></a></li>
                <li><a target="_blank" href="https://www.linkedin.com/in/satyam-shah-538269152/"><i className="fa fa-linkedin-square"></i></a></li>
                <li><a target="_blank" href="https://github.com/satyamshah"><i className="fa fa-github-square"></i></a></li>
        </div>
        </footer>
    )
}

export {Footer}