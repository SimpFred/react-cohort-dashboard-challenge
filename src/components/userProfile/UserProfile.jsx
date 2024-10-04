import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CohortAppContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import ProfileCircle from "../ProfileCircle";
import { update } from "../../api/api";

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ProfileHeader = styled.h2`
  margin-top: 10px;
  align-self: flex-start;
  margin-left: 70px;
  font-size: 2rem;
  color: #000046;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 90%;
`;

const NameHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #000046;
  margin-bottom: 20px;
  text-align: center;
  margin-left: 20px;
`;

const NameText = styled.span`
  margin-left: 10px;
`;

const Columns = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 30px;
`;

const SectionHeader = styled.h3`
  font-size: 1.5rem;
  color: #000046;
  margin-bottom: 10px;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const FieldLabel = styled.label`
  font-size: 1rem;
  color: #47477a;
  margin-bottom: 5px;
  display: block;
`;

const FieldInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #e6ebf5;
  color: #000046;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
`;

const SubmitButton = styled.button`
  background-color: #000046;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    background-color: #333;
  }
`;

const UserProfile = () => {
  const { userId } = useParams();
  const { contacts, setContacts } = useContext(CohortAppContext);

  const user = contacts.find((contact) => contact.id === parseInt(userId, 10));

  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    street: "",
  });

  useEffect(() => {
    if (user) {
      setNewContact({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        street: user.street,
      });
    }
  }, [user]);

  if (!user) {
    return <div>User not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedUserFromApi = await update("contact", user.id, newContact);

    const updatedContacts = contacts.map((contact) =>
      contact.id === user.id ? updatedUserFromApi : contact
    );

    setContacts(updatedContacts);
  };

  return (
    <Profile>
      <ProfileHeader>Profile</ProfileHeader>
      <Card>
        <NameHeader>
          <ProfileCircle
            width="60px"
            height="60px"
            firstName={user.firstName}
            lastName={user.lastName}
          />
          <NameText>
            {user.firstName} {user.lastName}
          </NameText>
        </NameHeader>

        <form onSubmit={handleSubmit}>
          <Columns>
            <Column>
              <SectionHeader>Account Info</SectionHeader>
              <Field>
                <FieldLabel>First Name*</FieldLabel>
                <FieldInput
                  type="text"
                  name="firstName"
                  value={newContact.firstName}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel>Last Name*</FieldLabel>
                <FieldInput
                  type="text"
                  name="lastName"
                  value={newContact.lastName}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel>Email*</FieldLabel>
                <FieldInput
                  type="text"
                  name="email"
                  value={newContact.email}
                  onChange={handleChange}
                />
              </Field>
            </Column>
            <Column>
              <SectionHeader>Address</SectionHeader>
              <Field>
                <FieldLabel>Street</FieldLabel>
                <FieldInput
                  type="text"
                  name="street"
                  value={newContact.street}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel>City</FieldLabel>
                <FieldInput
                  type="text"
                  name="city"
                  value={newContact.city}
                  onChange={handleChange}
                />
              </Field>
            </Column>
          </Columns>
          <ButtonContainer>
            <SubmitButton type="submit">Update</SubmitButton>
          </ButtonContainer>
        </form>
      </Card>
    </Profile>
  );
};

export default UserProfile;
