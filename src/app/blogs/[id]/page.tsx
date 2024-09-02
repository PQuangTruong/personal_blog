'use client'

import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useSWR, {Fetcher} from 'swr';

const ViewPageBlogs = ({ params }: { params: { id: string } }) => {

  const fetcher : Fetcher<IBlogs, string> = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    })

  if (isLoading) {
    return <div>Is loading...</div>
  }

  return (
    <div>
      <div>
        <Link href={'/blogs'} className='nav-link'>Trở Về</Link>
      </div>
      <Card className='text-center'>
        <Card.Header>{data?.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            {data?.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted'>{data?.author}</Card.Footer>
      </Card>
     </div>
  );
}

export default ViewPageBlogs;