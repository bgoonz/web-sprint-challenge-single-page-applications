import { useHistory } from "react-router";
import { headerStyle} from './Style';

const Header = () => {
  const history = useHistory();
  const updateUrl = (ev) => {
      ev.preventDefault()
      history.push(ev.target.target)
    }
    return (
    <headerStyle>
    <h1>Lambda Eats</h1>
    <ul>
    <li><a onClick={updateUrl} href="/" target="/">Home</a></li>
    <li><a onClick={updateUrl} id='order-pizza' href="/" target="/pizza">Order</a></li>
    <li>Contact</li>
    </ul>
   </headerStyle>
    )
}

export default Header;
