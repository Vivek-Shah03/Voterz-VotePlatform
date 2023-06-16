// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

contract VotingPlatform {
    struct Topic {
        address creator;
        uint256 expiryTime;
        mapping(address => bool) registeredVoters;
        mapping(address => bool) isPendingVoter;
        mapping(address => uint256) pendingVoterIndex;
        mapping(string => uint256) voteCount;
        mapping(string => bool) options;
        string[] optionList;
        address[] pendingVoters;
        mapping(address => bool) isVoted; // New mapping to track if a voter has voted
    }

    mapping(string => Topic) public topics;

    modifier onlyCreator(string memory topicId) {
        require(msg.sender == topics[topicId].creator, "Only the topic creator can perform this action");
        _;
    }

    modifier onlyRegisteredVoter(string memory topicId) {
        require(topics[topicId].registeredVoters[msg.sender], "Only registered voters can perform this action");
        _;
    }

    function createTopic(string memory topicId, uint256 durationInSeconds) external {
        require(topics[topicId].expiryTime == 0, "Topic with the same ID already exists");
        require(durationInSeconds > 0, "Duration must be greater than zero");
        
        uint256 expiryTime = block.timestamp + durationInSeconds;
        
        topics[topicId].creator = msg.sender;
        topics[topicId].expiryTime = expiryTime;
    }

    function addOption(string memory topicId, string memory option) external onlyCreator(topicId) {
        require(topics[topicId].expiryTime > 0, "Topic does not exist");
        require(block.timestamp < topics[topicId].expiryTime, "Voting period has ended");
        require(bytes(option).length > 0, "Option cannot be empty");
        require(!topics[topicId].options[option], "Option already exists");

        topics[topicId].options[option] = true;
        topics[topicId].optionList.push(option);
    }

    function registerVoter(string memory topicId) external {
        require(topics[topicId].expiryTime > 0, "Topic does not exist");
        require(block.timestamp < topics[topicId].expiryTime, "Voting period has ended");
        require(!topics[topicId].registeredVoters[msg.sender], "Voter is already registered");

        topics[topicId].isPendingVoter[msg.sender] = true;
        topics[topicId].pendingVoters.push(msg.sender);
        topics[topicId].pendingVoterIndex[msg.sender] = topics[topicId].pendingVoters.length - 1;
    }

    function allowVoter(string memory topicId, address voter) external onlyCreator(topicId) {
        require(topics[topicId].isPendingVoter[voter], "Voter is not pending");

        Topic storage topic = topics[topicId];

        // Mark the voter as registered
        topic.registeredVoters[voter] = true;

        // Remove from pending voters
        address[] storage pendingVoters = topic.pendingVoters;
        uint256 index = topic.pendingVoterIndex[voter];
        uint256 lastIndex = pendingVoters.length - 1;
        if (index != lastIndex) {
            address lastVoter = pendingVoters[lastIndex];
            pendingVoters[index] = lastVoter;
            topic.pendingVoterIndex[lastVoter] = index;
        }
        pendingVoters.pop();

        delete topic.isPendingVoter[voter];
        delete topic.pendingVoterIndex[voter];
    }

    function rejectVoter(string memory topicId, address voter) external onlyCreator(topicId) {
        require(topics[topicId].expiryTime > 0, "Topic does not exist");
        require(block.timestamp < topics[topicId].expiryTime, "Voting period has ended");

        delete topics[topicId].registeredVoters[voter];
    }

    function getPendingVoters(string memory topicId) external view onlyCreator(topicId) returns (address[] memory) {
        require(topics[topicId].expiryTime > 0, "Topic does not exist");

        return topics[topicId].pendingVoters;
    }

    function getOptionsForTopic(string memory topicId) external view returns (string[] memory) {
        require(topics[topicId].expiryTime > 0, "Topic does not exist");

        Topic storage topic = topics[topicId];

        return topic.optionList;
    }

    function vote(string memory topicId, string memory option) external onlyRegisteredVoter(topicId) {
        require(topics[topicId].expiryTime > 0, "Topic does not exist");
        require(block.timestamp < topics[topicId].expiryTime, "Voting period has ended");
        require(topics[topicId].options[option], "Invalid voting option");
        require(!topics[topicId].isVoted[msg.sender], "Already voted for this topic");

        topics[topicId].isVoted[msg.sender] = true; // Mark the voter as voted
        topics[topicId].voteCount[option]++;
    }

    function getVoteCount(string memory topicId, string memory option) external view returns (uint256) {
        return topics[topicId].voteCount[option];
    }

}
