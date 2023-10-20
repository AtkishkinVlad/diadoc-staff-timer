import { FC, useContext, useEffect, useState } from "react";

import intervalToDuration from 'date-fns/intervalToDuration';
import { DateContext } from "../App";

export const DateAfterLastLeave: FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const startDate = useContext(DateContext);

    useEffect(() => {
        setInterval(() => setCurrentDate(new Date()), 60_000)
    }, [currentDate])

    if (!startDate) {
        return (
            <p>
                Необходимо указать дату последнего выхода из команды...
            </p>
        )
    }

    const interval = intervalToDuration({ start: startDate, end: currentDate });
    
    return (
        <time>
            <span className="date__days">{interval.days} дней</span> <span className="separator">/</span> <span className="date__hours">{interval.hours} часов</span> <span className="separator">/</span> <span className="date__minutes">{interval.minutes} минут</span>
        </time>
    )
}