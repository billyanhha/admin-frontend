import React, { useEffect } from 'react';
import "./style.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment"

const History = (props) => {

    const { packageData } = useSelector(state => state.package)
    const index = props?.tabIndex;

    useEffect(() => {


    }, []);

    const renderTimeline = packageData.status?.map((value, index) => {
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#F2F7FA', color: '#448AFF' }}
                contentArrowStyle={{ borderRight: '7px solid  #448AFF' }}
                date={moment(value?.created_at).format('DD - MM - YYYY [lúc] HH [giờ] mm [phút]')}
                iconStyle={{ background: '#448AFF', color: '#fff' }}
            >
                <p>
                    {value?.status_name}
                </p>
                <h4>{value?.note ? `Ghi chú : ${value?.note} ` : ''}</h4>
            </VerticalTimelineElement>
        )
    })
    return index === 1 && (
            <div>
                <VerticalTimeline className="vertical-timeline vertical-timeline-custom-line" >
                    {renderTimeline}
                </VerticalTimeline>
            </div>
    );
};

export default History;