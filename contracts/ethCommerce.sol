pragma solidity ^0.4.11;

contract ethCommerce {
  // State variables
  address seller;
  string name;
  string description;
  uint256 price;

  // constructor
  function ethCommerce() {
    sellArticle('Default article', 'This is an article set by default', 1000000000000000000);
  }

  // sell an article
  function sellArticle(string _name, string _description, uint256 _price) public {
    seller = msg.sender;
    name = _name;
    description = _description;
    price = _price;
  }

  // get an article
  function getArticle() public constant returns (address _seller, string _name, string _description, uint256 _price) {
      return (seller, name, description, price);
  }

}
