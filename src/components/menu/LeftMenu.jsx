import styled from "styled-components";
import homeIcon from "../../assets/home-icon-svg.svg";
import profileIcon from "../../assets/profile-icon-svg.svg";

const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e6ebf5;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Text = styled.span`
  color: #6d6d93;
  display: block;
  text-align: center;
`;

const LeftMenu = () => {
  const handleMenuItemClick = (menuItem) => {
    console.log(`${menuItem} clicked`);
    // Lägg till din navigeringslogik här, t.ex. använd React Router för att navigera
  };

  return (
    <MenuContainer>
      <MenuItem onClick={() => handleMenuItemClick("Home")}>
        <Icon src={homeIcon} alt="Home Icon" />
        <Text>Home</Text>
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Profile")}>
        <Icon src={profileIcon} alt="Profile Icon" />
        <Text>Profile</Text>
      </MenuItem>
    </MenuContainer>
  );
};

export default LeftMenu;
