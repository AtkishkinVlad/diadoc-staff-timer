import { FC } from "react";

import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';

type Props = {
    lastLeaveDate: Date | null;
}

export const DateAfterLastLeave: FC<Props> = ({ lastLeaveDate }) => {
    const currentDate = new Date();

    if (!lastLeaveDate) {
        return (<p>
            Необходимо указать дату последнего выхода из команды...
        </p>)
    }

    const diffInDays = differenceInDays(currentDate, lastLeaveDate)
    const diffInHours = differenceInHours(currentDate, lastLeaveDate)
    const diffInMinutes = differenceInMinutes(currentDate, lastLeaveDate)
    
    return (<time>
        <span className="date__days">{diffInDays} дней</span> <span className="separator">/</span> <span className="date__hours">{diffInHours} часов</span> <span className="separator">/</span> <span className="date__minutes">{diffInMinutes} минут</span>
    </time>)
}