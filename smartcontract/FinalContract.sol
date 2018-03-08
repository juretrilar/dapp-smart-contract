pragma solidity ^0.4.18;

contract FinalContract {
 
 address public contractCreatorAddress = msg.sender; 
 string public contractName = "Sample Agreement for Future Tokens for Accredited Investor"; /* your custom contrat name */
 
 struct User { 
        bytes32[] activeArticles; /* users articles array */
        uint balanceOf; /* token balance */
    }
 mapping (address => User) public users; /* users mapping*/
 address[] private usersList; /* known users list for iterations */
 
 
 mapping(bytes32 => string) articles; /* articles mapping */
 bytes32[] private articleList; /* articles list for iterations */
 
 
 /* user functions */
 
 function userSignArticle(address _address, bytes32 _article) private { /* user signs single article - TODO: modify to msg.sender instead of function input */
        users[_address].activeArticles.push(_article);
 }
  
 function userSignArticles(address _address, bytes32[] _articles) public { /* user signs single article - TODO: modify to msg.sender instead of function input */
   for (uint i = 0; i < _articles.length; i++) userSignArticle(_address, _articles[i]);
   usersList.push(_address); /* add user to known list if interaction */
 }
 
 function returnUserData(address _address) view public returns(bytes32[],uint) { /* get user data: signed articles and in token balance */
        return (users[_address].activeArticles, users[_address].balanceOf);
 }
 
 function setUserTokenBalance(address _address, uint _value) public { /* admin superpowers: set know user tokenbalance */
        users[_address].balanceOf = _value;
        usersList.push(_address); /* add user to list if interaction */
 }
 
 function getUserList() view public returns(address[]) { /* iterations */
        return usersList;
    }
 
 /* article functions */
 
  function addHashValue(string value) public returns(bool){ /* add hashkey and corespondig string */
        articleList.push(keccak256(value));
        return addKeyValueByHash(keccak256(value), value);
    }
 
    function addKeyValueByHash(bytes32 hash, string value) private returns(bool){
        if(bytes(articles[hash]).length != 0) { /* Don't overwrite previous mappings and return false */
            return false;
        }
        articles[hash] = value;
        return true;
    }

    function getValueByHash(bytes32 hash) constant public returns(string) { /* ger string by hashkey */
        return articles[hash];
    }
    
    function getArticleList() view public returns(bytes32[]) { /* iterations */
        return articleList;
    }
    
}