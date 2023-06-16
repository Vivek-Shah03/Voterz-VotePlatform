import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

const Topics = ({state}) => {

    const [pending, setPending] = useState([]);
    const createTopic = async (event) => {
        event.preventDefault();
        const contract = state.contract;
        // console.log(contract)
        const topicName = document.querySelector('#topic_name').value;
        const expiryTime = parseInt(document.querySelector('#expiry_time').value);
        const transaction = await contract.createTopic(topicName, expiryTime);
        await transaction.wait()
        setPending(transaction)
        // console.log(transaction)
        alert("Topic Created successfully!")
        window.location.reload();
        // console.log(typeof(topicName), typeof(expiryTime));
    }

    const addOption = async (event) => {
        event.preventDefault();
        const contract = state.contract;
        const topicName = document.querySelector('#topic_name_option').value;
        const option = document.querySelector('#option').value;
        const transaction = await contract.addOption(topicName, option);
        await transaction.wait()
        // console.log(transaction)
        alert("Option Added successfully!")
        window.location.reload();
    }

    const getPendingVoters = async (event) => {
        event.preventDefault();
        const contract = state.contract;
        const topicName = document.querySelector('#topic_name_pending').value;
        const transaction = await contract.getPendingVoters(topicName);
        setPending(transaction)
        // console.log(transaction)
        alert("Pending Voters Fetched successfully!")
    }

    const allowVoter = async (event) => {
        event.preventDefault();
        const contract = state.contract;
        const topicName = document.querySelector('#topic_name_allow').value;
        const address = document.querySelector('#allow_address').value;
        const transaction = await contract.allowVoter(topicName, address);
        await transaction.wait()
        // console.log(transaction)
        alert("Voter Approved!")
        window.location.reload();
    }

    const rejectVoter = async (event) => {
        event.preventDefault();
        const contract = state.contract;
        const topicName = document.querySelector('#topic_name_reject').value;
        const address = document.querySelector('#reject_address').value;
        const transaction = await contract.rejectVoter(topicName, address);
        await transaction.wait()
        // console.log(transaction)
        alert("Voter Rejected!")
        window.location.reload();
    }

    const getVoteCount = async(event) => {
        event.preventDefault();
        const contract = state.contract;
        const topicName = document.querySelector('#topic_name_vote_count').value;
        const option = document.querySelector('#option_vote_count').value;
        const transaction = await contract.getVoteCount(topicName, option);
        console.log(transaction)
        alert(transaction)
        window.location.reload();
    }
    return <>
    <Container style={{padding: '0 30%', textAlign: 'center'}} >
    <h2>Hi, Create a Topic HERE!</h2>
        <Form onSubmit={ createTopic }>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>

            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Expiry Time</Form.Label>
                <Form.Control id='expiry_time' type="text" placeholder="Enter Expiry Time in seconds" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Create Topic
            </Button>
        </Form>
        <h2>Now, Assign Options To your Topic!</h2>
        <Form onSubmit={ addOption }>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name_option' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>

            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Option</Form.Label>
                <Form.Control id='option' type="text" placeholder="Enter one option at a time" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Add Option
            </Button>
        </Form>
        <h2>See, Pending Voters Here!</h2>
        <Form onSubmit={ getPendingVoters }>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name_pending' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Get Requests
            </Button>
            <center>
                {
                    pending.map((voter) =>
                        <li>{voter}</li>
                        )
                }
            </center>
        </Form>
        <h2>Allow Voter!</h2>
        <Form onSubmit={ allowVoter }>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name_allow' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>

            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Address</Form.Label>
                <Form.Control id='allow_address' type="text" placeholder="Enter address of voter" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Allow Voter
            </Button>
        </Form>
        <h2>Reject Voter!</h2>
        <Form onSubmit={ rejectVoter }>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name_reject' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>

            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Address</Form.Label>
                <Form.Control id='reject_address' type="text" placeholder="Enter address of voter" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Reject Voter
            </Button>
        </Form>

        <h2>Get Vote Count</h2>
        <Form onSubmit={ getVoteCount }>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Topic ID</Form.Label>
                <Form.Control id='topic_name_vote_count' type="text" placeholder="Enter Topic ID as a string" />
            </Form.Group>
            <Form.Group className="mb-3 form-ele">
                <Form.Label className='form-label'>Option</Form.Label>
                <Form.Control id='option_vote_count' type="text" placeholder="Enter one option at a time" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Get Count
            </Button>
            <center>
                {
                    pending.map((voter) =>
                        <li>{voter}</li>
                        )
                }
            </center>
        </Form>

    </Container>
        
    </>
}

export default Topics;