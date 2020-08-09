import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.header`
  border-bottom: 1px solid #e4e4e4;
  color: #666666;
  padding: 25px 0;
  margin-bottom: 30px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.a`
  padding: 0 10px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  &:hover {
    cursor: pointer;
  }
`;

const MainWrapper = styled.div`
  padding: 0 10px;
`;

function Layout({ children, page }) {
  return (
    <>
      <Header>
        <Navigation>
          <Link href="/">
            <StyledLink active={page === 'home'}>Home</StyledLink>
          </Link>
          <Link href="/create">
            <StyledLink active={page === 'create'}>Create post</StyledLink>
          </Link>
        </Navigation>
      </Header>
      <MainWrapper>{children}</MainWrapper>
    </>
  );
}

export default Layout;
