import { Button, Descriptions, message, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { withContextInitialized } from '../../components/hoc';
import { usePersonInformation } from '../../components/hooks/usePersonInformation';
import CompanyCard from '../../components/molecules/CompanyCard';
import OverlaySpinner from '../../components/molecules/OverlaySpinner';
import GenericList from '../../components/organisms/GenericList';
import ProfileEdit from '../../components/organisms/ProfileEdit';
import { ResponsiveListCard } from '../../constants';
import { Company } from '../../constants/types';




const PersonDetail = () => {
  const router = useRouter();
  const { load, loading, save, data } = usePersonInformation(
    router.query?.email as string,
    true
  );
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <OverlaySpinner title={`Loading ${router.query?.email} information`} />;
  }

  if (!data) {
    message.error("The user doesn't exist redirecting back...", 2, () =>
      router.push('/home')
    );
    return <></>;
  }

  return (
    <>
      <PageHeader
        onBack={router.back}
        title="Person"
        subTitle="Profile"
        extra={[
          <Button
            style={{ padding: 0, margin: 0 }}
            type="link"
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
          </Button>,
          <Button type="default" onClick={() => setShowEdit(true)}>
            Edit
          </Button>,
        ]}
      >
        {showEdit ? (
          <ProfileEdit save={save} data={data} setShowEdit={setShowEdit} />
        ) : (
          <>
            {data && (
              <Descriptions size="small" column={1}>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Gender">{data.gender}</Descriptions.Item>
                <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>

                <Descriptions.Item label="Birthday">{data.birthday}</Descriptions.Item>
              </Descriptions>
            )}
            <GenericList<Company>
              loading={loading}
              extra={ResponsiveListCard}
              data={data && data.companyHistory}
              ItemRenderer={({ item }: any) => <CompanyCard item={item} />}
              handleLoadMore={() => {}}
              hasMore={false}
            />
          </>
        )}
      </PageHeader>
    </>
  );
};

export default withContextInitialized(PersonDetail);
