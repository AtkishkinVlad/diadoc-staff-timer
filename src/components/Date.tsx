import { FC, useContext, useEffect, useState } from "react";

import intervalToDuration from 'date-fns/intervalToDuration';
import differenceInDays from 'date-fns/differenceInDays';

import { DateContext } from "../App";
import { FormattedPlural } from 'react-intl';

export const DateAfterLastLeave: FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const startDate = useContext(DateContext);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 10_000);

        return () => clearInterval(timer);
    }, [currentDate])

    if (!startDate) {
        return (
            <p className="emptyStub__text">
                Подозрительно тихо на горизонте 👀
            </p>
        )
    }

    try {
        const interval = intervalToDuration({ start: startDate, end: currentDate });
        const days = differenceInDays(startDate, currentDate);
    
        return (
            <time>
                <span className="date__days">{Math.abs(days)}&nbsp;<FormattedPlural value={Math.abs(Number(days))} one="день" zero="дней" few="дня" many="дней" other="день" /></span> <span className="separator__big">/</span>
                <span className="date__hours">{interval.hours}&nbsp;<FormattedPlural value={Number(interval.hours)} one="час" zero="часов" few="часа" many="часов" other="часов" /></span> <span className="separator__big">/</span>
                <span className="date__minutes">{interval.minutes}&nbsp;<FormattedPlural value={Number(interval.minutes)} one="минуту" zero="минут" few="минуты" many="минут" other="минут" /></span>
            </time>
        )
    } catch {
        return (
            <p className="emptyStub__text">
                Я бы рад сказать, но дату писал индус 👳
            </p>
        )
    }
}