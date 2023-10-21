import { FC, useContext, useEffect, useState } from "react";

import intervalToDuration from 'date-fns/intervalToDuration';
import { DateContext } from "../App";
import { FormattedPlural } from 'react-intl';

export const DateAfterLastLeave: FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const startDate = useContext(DateContext);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000);

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
    
        return (
            <time>
                <span className="date__year">{interval.years}&nbsp;<FormattedPlural value={Number(interval.years)} one="год" zero="лет" few="года" many="лет" other="лет" /></span> <span className="separator">/</span>
                <span className="date__month">{interval.months}&nbsp;<FormattedPlural value={Number(interval.months)} one="месяц" zero="месяцев" few="месяца" many="месяцев" other="месяцев" /></span><span className="separator">/</span>
                <span className="date__days">{interval.days}&nbsp;<FormattedPlural value={Number(interval.days)} one="день" zero="дней" few="дня" many="дней" other="день" /></span>
                <br /><hr />
                <span className="date__hours">{interval.hours}&nbsp;<FormattedPlural value={Number(interval.hours)} one="час" zero="часов" few="часа" many="часов" other="часов" /></span><span className="separator">/</span> 
                <span className="date__minutes">{interval.minutes}&nbsp;<FormattedPlural value={Number(interval.minutes)} one="минуту" zero="минут" few="минуты" many="минут" other="минут" /></span><span className="separator">/</span>
                <span className="date__seconds">{interval.seconds}&nbsp;<FormattedPlural value={Number(interval.seconds)} one="секунду" zero="секунд" few="секунды" many="секунд" other="секунды" /></span>
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