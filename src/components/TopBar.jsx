import React from 'react';
import styled from 'styled-components';
import logoImg from '../assets/trackit_topbar.png';
import defaultProfile from '../assets/profile.png';

export default function TopBar(){
  const userImage = localStorage.getItem('trackit-user-image');

  return (
    <Bar>
      <Inner>
        <Left>
          <Logo src={logoImg} alt="TrackIt" />
        </Left>

        <Right>
          {userImage ? <Avatar src={userImage} alt="profile"/> : <Avatar src={defaultProfile} alt="profile"/>}
        </Right>
      </Inner>
    </Bar>
  )
}

const Bar = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  background: #126BA5;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 375px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: #126BA5;
  height: 70px;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.15);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 97px;
  height: 49px;
  object-fit: contain;
  display: block;
  margin-left: 6px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  margin-right: 6px;
`;

const AvatarPlaceholder = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  margin-right: 6px;
`;
