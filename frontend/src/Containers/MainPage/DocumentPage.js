import { Typography, Timeline, Tag } from 'antd';

const { Title, Paragraph } = Typography;

const DocumentPage = (props) => {
    
    return (
        <>
            <Typography>
                <Title>Record for #99999</Title>
                <Paragraph>This is an example of document description.</Paragraph>
            </Typography>
            <br />
            <Timeline>
                <Timeline.Item color="green"><Tag color="green">Pass</Tag>教授 呂XX</Timeline.Item>
                <Timeline.Item color="green"><Tag color="green">Pass</Tag>資工系辦 黃XX</Timeline.Item>
                <Timeline.Item color="blue"><Tag color="blue">In Process</Tag>資工系辦 周XX</Timeline.Item>
                <Timeline.Item color="gray"><Tag>Pending</Tag>資工系主任 洪XX</Timeline.Item>
                <Timeline.Item color="gray"><Tag>Pending</Tag>電資學院院長 張XX</Timeline.Item>
            </Timeline>
        </>
    );
}

export default DocumentPage;