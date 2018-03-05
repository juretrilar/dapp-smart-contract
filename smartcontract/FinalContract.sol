pragma solidity ^0.4.18;

contract FinalContract {
 
 address public contractCreatorAddress = msg.sender;
 string public contractName = "Terms of Service";
 
 struct User {
        bytes32[] activeArticles; /* users articles array */
        uint balanceOf; /* id&utility token balance */
    }
 mapping (address => User) public users; /* users mapping*/
 address[] private usersList; /*known users list*/
 
 
 mapping(bytes32 => string) articles; /* articles mapping*/
 bytes32[] private articleList; /* articles list for iterations */
 
 
 /* user functions */
 
 function userSignArticle(address _address, bytes32 _article) private { /* Jure: user podpiše single article*/
        users[_address].activeArticles.push(_article);
 }
  
 function userSignArticles(address _address, bytes32[] _articles) public { /* Jure: user podpiše multiple articlov*/
   for (uint i = 0; i < _articles.length; i++) userSignArticle(_address, _articles[i]);
   usersList.push(_address); /*add user to known list if interaction*/
    //users[_address].activeArticles = _articles; /* total control user articles */
 }
 
 function returnUserData(address _address) view public returns(bytes32[],uint) { /* Jure: pokaži podatke za userja, articles in token balance */
        return (users[_address].activeArticles, users[_address].balanceOf);
 }
 
 function setUserTokenBalance(address _address, uint _value) public { /* Jure admin: userju nastavimo tokenbalance*/
        users[_address].balanceOf = _value;
        usersList.push(_address); /*add user to list if interaction*/
 }
 
 function getUserList() view public returns(address[]) {
        return usersList;
    }
 
 /* article functions */
 
  function addHashValue(string value) public returns(bool){ /* Jure admin: ADD string and its hash for index*/
        articleList.push(keccak256(value));
        return addKeyValueByHash(keccak256(value), value);
    }
 
    function addKeyValueByHash(bytes32 hash, string value) private returns(bool){
        if(bytes(articles[hash]).length != 0) { // Don't overwrite previous mappings and return false
            return false;
        }
        articles[hash] = value;
        return true;
    }

    function getValueByHash(bytes32 hash) constant public returns(string) { /* Jure: dobi value po hashu*/
        return articles[hash];
    }
    
    function getArticleList() view public returns(bytes32[]) {
        return articleList;
    }
    
}