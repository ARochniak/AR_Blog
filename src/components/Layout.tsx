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
  font-weight: ${(props: { isActive: boolean }) => (props.isActive ? 'bold' : 'normal')};
  &:hover {
    cursor: pointer;
  }
`;

const MainWrapper = styled.div`
  padding: 0 10px;
`;

function Layout({ children, page }: { children: React.ReactElement; page: string }) {
  return (
    <>
      <Header>
        <Navigation>
          <Link href="/">
            <StyledLink isActive={page === 'home'}>Home</StyledLink>
          </Link>
          <Link href="/create">
            <StyledLink isActive={page === 'create'}>Create post</StyledLink>
          </Link>
        </Navigation>
      </Header>
      <MainWrapper>{children}</MainWrapper>
    </>
  );
}

export default Layout;
