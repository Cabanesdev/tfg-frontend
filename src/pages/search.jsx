import { useEffect, useRef, useState } from 'react';
import { VscSearch } from 'react-icons/vsc'
import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';
import { Container, MainContainer, SearchContainer, PostsContainer } from '../components/styled/div';

import { SearchInput } from '../components/styled/input';
import { SectionButton } from '../components/styled/button';
import Api from '../utils/api';

import infiniteScroll from '../utils/scroll';

function Search() {
  const [isPostsActive, setIsPostsActive] = useState(true)
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const inputRef = useRef({})
  const divRef = useRef({})
  const api = new Api();

  useEffect(() => {
    if (page > 1)
      updateData()
  }, [page])

  useEffect(() => {
    getData()
  }, [isPostsActive])

  const getData = async () => {
    const params = { page: 1 }
    if (isPostsActive) {
      params.title = inputRef.current.value
      if (!params.title) {
        setData([])
        return;
      }
      const response = await api.getPosts(params)
      setData(response.data.data);
      setPage(1)
    } else {
      params.username = inputRef.current.value
      if (!params.username) {
        setData([])
        return;
      }
      const response = await api.getUsers(params)
      console.log(response.data.data)
      setData(response.data.data);
      setPage(1)
    }
  }

  const updateData = async () => {
    const params = { page }
    if (isPostsActive) {
      params.title = inputRef.current.value
      if (!params.title) {
        setData([])
        return;
      }
      const response = await api.getPosts(params)
      setData([...data, ...response.data.data]);
    }
  }

  return (
    <MainContainer>
      <Container flex w={'100%'} h={'100%'} >
        <Navbar />
        <Container
          w={'100%'}
          h={'100%'}
          of_y={'auto'}
          ref={divRef}
          onScroll={() => infiniteScroll(divRef, page, setPage)}
        >
          <Container bh flex
            fd={'column'}
            ai={'center'}
            w={'65%'}
            p={'15px'}
          >
            <SearchContainer flex>
              <VscSearch size={15} />
              <SearchInput
                ref={inputRef}
                onChange={() => getData()} />
            </SearchContainer>
            <Container
              flex
              types
              jc={'space-evenly'}
              ai={'center'}
              m={'20px 0 0 0'}
              w={'100%'}
            >
              <SectionButton
                active={isPostsActive}
                onClick={() => setIsPostsActive(true)}
              >
                Posts
              </SectionButton>
              <SectionButton
                active={!isPostsActive}
                onClick={() => setIsPostsActive(false)}
              >
                Users
              </SectionButton>
            </Container>
            <Container
              flex
              fd={'column'}
              w={'100%'}
            >
              {data.map((data) =>
                <Card key={data._id}>
                  <Post data={data} />
                </Card>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </MainContainer >
  )
}

export default Search
