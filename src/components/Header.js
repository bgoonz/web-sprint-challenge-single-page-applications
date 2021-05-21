import { useHistory } from "react-router";
import styled from "styled-components";

const StyledHeader = styled.header`
  display:flex;
  justify-content:space-between;
  background: red;
  padding: 0 30px 0 30px;
  align-items: center;
  h1 {
    font-size: 3rem;
  }
  ul {
    color: white-smoke;
    font-size: 1.5rem;
  }
  ul li a { color: yellow }
`

const Header = () => {
  const history = useHistory();
  const updateUrl = (ev) => {
      ev.preventDefault()
      history.push(ev.target.target)
    }
    return (
    <StyledHeader>
    <h1>Lambda Eats</h1>
    <ul>
    <li><a onClick={updateUrl} href="/" target="/">Home</a></li>
    <li><a onClick={updateUrl} id='order-pizza' href="/" target="/pizza">Order</a></li>
    <li>Contact</li>
    </ul>
    </StyledHeader>
    )
}

export default Header;