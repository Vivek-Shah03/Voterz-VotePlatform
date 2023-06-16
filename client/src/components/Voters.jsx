import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const Voters = (state) => {

    const registerVoter = async (event) => {
        event.preventDefault();
        const contract = state.state.contract;
        // console.log(state);
        // console.log(contract)
        const topicName = document.querySelector('#topic_name_voter').value;
        const transaction = await contract.registerVoter(topicName);
        await transaction.wait()
        // console.log(transaction)
        alert("Voter Registered successfully!")
    }

    const vote = async (event) => {
        event.preventDefault();
        const contract = state.state.contract;
        const topicName = document.querySelector('#topic_name_to_vote').value;
        const option = document.querySelector('#option_to_vote').value;
        // console.log(topicName,option,contract)
        const transaction = await contract.vote(topicName, option);
        await transaction.wait()
        // console.log(transaction)
        alert("You voted successfully!") 
    }

    return <>
    <Container style={{padding: '0 30%', textAlign: 'center'}}>
    <h2>Register Here!</h2>
        <Form onSubmit={ registerVoter }>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name_voter' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>

        <h2>Vote Now!</h2>
        <Form onSubmit={ vote }>
        <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name_to_vote' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>

            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Option</Form.Label>
                <Form.Control id='option_to_vote' type="text" placeholder="Enter option to vote for" />
            </Form.Group>


            <Button variant="primary" type="submit">
                vote
            </Button>
        </Form>
    </Container>
    </>
}

export default Voters;