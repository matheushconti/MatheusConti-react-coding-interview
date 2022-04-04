import { CheckOutlined } from '@ant-design/icons';
import { Button, Col, Layout, PageHeader, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Loading from '../components/atoms/Loading';
import { usePeople } from '../components/hooks/usePeople';
import { DEFAULT_PAGE_SIZE } from '../components/molecules/ListHeader';


const Image = styled.img`
  height: 44px;
  width: 95px;
  margin: 0 auto;
`;

const Splash = () => {
  const router = useRouter();
  const { execute, initialized: initializedPeopleInfo } = usePeople();

  useEffect(() => {
    (async () => {
      await execute(DEFAULT_PAGE_SIZE);
    })();
  },[]);

  useEffect(() => {
    if (initializedPeopleInfo) router.push('/home');
  }, [initializedPeopleInfo]);

  return (
    <PageHeader
      subTitle="We are loading your information"
      extra={[
        <Button
          key="beon-logo"
          type="link"
          href="https://beon.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/beon.svg" alt="BEON Logo" />
        </Button>,
      ]}
    >
      <Layout>
        <Layout.Content>
          <Row>
            <Col span={24}>
              {initializedPeopleInfo ? (
                <CheckOutlined />
              ) : (
                <Loading title="Loading people information" />
              )}
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </PageHeader>
  );
};

export default Splash;
