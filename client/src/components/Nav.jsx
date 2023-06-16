import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Nav = (account) => {
    return <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">VoterZ</Navbar.Brand>
                <Navbar.Text>Connected Account - {account}</Navbar.Text>
            </Container>
        </Navbar>
    </>
}

export default Nav;