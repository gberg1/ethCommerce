pragma solidity ^0.4.11;

contract ethCommerce {
  // State variables
  address seller;
  address buyer;
  string name;
  string description;
  uint256 price;

  // events
  event sellArticleEvent (
    address indexed _seller,
    string _name,
    uint256 _price
  );

  event buyArticleEvent (
    address indexed _seller,
    address indexed_buyer,
    string _name,
    uint256 _price
  );

  // sell an article
  function sellArticle(string _name, string _description, uint256 _price) public {
    seller = msg.sender;
    name = _name;
    description = _description;
    price = _price;
    sellArticleEvent(seller, name, price);
  }

  // get an article
  function getArticle() public constant returns (
    address _seller,
    address _buyer,
    string _name,
    string _description,
    uint256 _price) {
    return (seller, buyer, name, description, price);
  }

  function buyArticle() payable public {
    // Ensure there is an article for sale
    require(seller != 0x0);
    // Ensure article not already Sold
    require(buyer == 0x0);
    // Ensure seller doesn't buy own article
    require(msg.sender != seller);
    // Ensure value sent corresponds to the artidcle price
    require(msg.value == price);
    // Store buyer info
    buyer = msg.sender;
    // Purchase article
    seller.transfer(msg.value);
    buyArticleEvent(seller, buyer, name, price);
  }

}
