import { FC, useContext, useEffect, useState } from "react";

import intervalToDuration from 'date-fns/intervalToDuration';
import { DateContext } from "../App";

export const DateAfterLastLeave: FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const startDate = useContext(DateContext);

    useEffect(() => {
        setInterval(() => setCurrentDate(new Date()), 1000)
    }, [currentDate])

    if (!startDate) {
        return (
            <p className="emptyStub__text">
                Подозрительно тихо на горизонте 👀
            </p>
        )
    }

    const interval = intervalToDuration({ start: startDate, end: currentDate });
    
    return (
        <time>
            <span className="date__days">{interval.days}&nbsp;дней</span> <span className="separator">/</span> <span className="date__hours">{interval.hours}&nbsp;часов</span><span className="separator">/</span> <span className="date__minutes">{interval.minutes}&nbsp;минут</span><span className="separator">/</span><span className="date__seconds">{interval.seconds}&nbsp;секунд</span>
        </time>
    )
}