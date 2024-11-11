import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';

import {
  Card,
  GetStartedCard,
  // Loader,
  // NotificationsCard,
  PageHeader,
  // ProjectsCard,
  // TasksChartCard,
  // TasksListCard,
  // WeeklyActivityCard,
} from '@/components';
import {
  // Alert,
  Button,
  // CardProps,
  // Carousel,
  // CarouselProps,
  Col,
  Row,
  Typography,
} from 'antd';

import { DASHBOARD_ITEMS } from '@/constants';
import { useStylesContext } from '@/context';
// import useFetchData from '@/hooks/use-fetch-data';

// :CarouselProps
const CAROUSEL_PROPS = {
  slidesToShow: 1,
  slidesToScroll: 1,
};
// :CardProps
const CARD_PROPS = {
  style: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
};

export const DefaultDashboardPage = () => {
  const stylesContext = useStylesContext();

  // const {
  //   data: tasksListData = [],
  //   error: tasksListError,
  //   loading: tasksListLoading,
  // } = useFetchData('/mocks/TasksList.json');
  // const {
  //   data: projectsData = [],
  //   error: projectsError,
  //   loading: projectsLoading,
  // } = useFetchData('/mocks/Projects.json');
  // const {
  //   data: notificationsData = [],
  //   error: notificationsError,
  //   loading: notificationsLoading,
  // } = useFetchData('/mocks/Notifications.json');

  return (
    <div>
      <Helmet>
        <title>Default | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="default dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboards</span>
              </>
            ),
            menu: {
              items: DASHBOARD_ITEMS.map(d => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          {
            title: 'default',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col xs={24} lg={18}>
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} md={24}>
              <Row {...stylesContext?.rowProps}>
                <Col xs={24} lg={18}>
                  <GetStartedCard {...CARD_PROPS} />
                </Col>
                <Col xs={24} lg={6}>
                  <Row {...stylesContext?.rowProps}>
                    <Col xs={12} lg={24}>
                      <Card>
                        <div className="flex flex-col items-center gap-4">
                          <Typography.Title style={{ margin: 0 }}>
                            <CountUp end={10} />+
                          </Typography.Title>
                          <Typography.Text>Projects</Typography.Text>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={12} lg={24}>
                      <Card>
                        <div className="flex flex-col items-center gap-4">
                          <Typography.Title style={{ margin: 0 }}>
                            <CountUp end={60} />+
                          </Typography.Title>
                          <Typography.Text>Tasks</Typography.Text>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={12}>
              weekly activity card
              {/* <WeeklyActivityCard data={ACTIVITY_DATA} /> */}
            </Col>
            <Col xs={24} lg={12}>
              weekly activity card
              {/* <TasksChartCard data={TASKS_DATA} /> */}
            </Col>
            <Col span={24}>tasks card</Col>
          </Row>
        </Col>
        <Col md={24} lg={6}>
          <Row {...stylesContext?.rowProps}>
            <Col span={24}>
              <Card
                title="Ongoing projects"
                extra={<Button>View all</Button>}
                bordered={false}
              >
                ongoing carousel projects...
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="Queued projects"
                extra={<Button>View all</Button>}
                bordered={false}
              >
                queueed projects...
              </Card>
            </Col>
            <Col span={24}>notification cards</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
