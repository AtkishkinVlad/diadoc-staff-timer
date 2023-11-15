import { SettingsGearIcon64Regular } from '@skbkontur/icons/icons/SettingsGearIcon/SettingsGearIcon64Regular'
import { Button, Center, DatePicker, Gapped, Hint, Modal, Tooltip } from '@skbkontur/react-ui'

import clockPath from './assets/clock.svg';
import { DateAfterLastLeave } from './components/Date';
import React, { createContext, useEffect, useState } from 'react';
import getDate from 'date-fns/getDate';
import getYear from 'date-fns/getYear';
import { getMonth } from 'date-fns';
import format from 'date-fns/format';
import { TimeClockMoveBackIcon16Regular } from '@skbkontur/icons/icons/TimeClockMoveBackIcon/TimeClockMoveBackIcon16Regular';
import { TimeClockMoveBackIcon64Regular } from '@skbkontur/icons/icons/TimeClockMoveBackIcon/TimeClockMoveBackIcon64Regular';
import { TransportAirRocketIcon16Regular } from '@skbkontur/icons/icons/TransportAirRocketIcon/TransportAirRocketIcon16Regular';

export const DateContext = createContext<null | Date>(null);

function App() {
  const [opened, setOpened] = React.useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [error, setError] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(false);

  const maxDate = format(new Date(), 'dd.MM.yyyy');

  const unvalidate = () => {
    setError(false);
    setTooltip(false);
  };

  const validate = () => {
    const errorNew = !!currentDate && !DatePicker.validate(currentDate, { maxDate });
    setError(errorNew);
    setTooltip(errorNew);
  };

  const removeTooltip = () => setTooltip(false);

  useEffect(() => {
    const saveLastDate = window.localStorage.getItem('currentDate');
    
    if (!saveLastDate) {
      return;
    }

    const [day, month, year] = saveLastDate.split('.');
    setCurrentDate(saveLastDate);
    setDate(new Date(+year, +month - 1, +day));
  }, [])

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>
            <h2 className='modal__header'>
              Настройки таймера
            </h2>
        </Modal.Header>
        <Modal.Body>
          <Hint pos='right' text="Назначить день отсчета для таймера">
            <Tooltip pos='right middle' trigger={tooltip ? 'opened' : 'closed'} render={() => 'Гость из будущего 🔮'} onCloseClick={removeTooltip}>
              <DatePicker error={error}
                onFocus={unvalidate}
                onBlur={validate}
                enableTodayLink size='large' value={currentDate} onValueChange={(event) => {
                window.localStorage.setItem('currentDate', event);

                const [day, month, year] = event.split('.');
                setCurrentDate(event);
                setDate(new Date(+year, +month - 1, +day));
              }} />
            </Tooltip>
          </Hint>
        </Modal.Body>
        <Modal.Footer>
          <Gapped gap={24}>
            <Button icon={<TransportAirRocketIcon16Regular />} size='large' use='primary' onClick={close}>
              Запустить
            </Button>
            <Button icon={<TimeClockMoveBackIcon16Regular />} size='large' use='danger' onClick={() => {
              close();
              setDate(null);
              setCurrentDate('');
              window.localStorage.removeItem('currentDate');
            }}>
              Сбросить
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  return (
    <DateContext.Provider value={date}>
    <Center>
      {opened && renderModal()}
      <header className='header'>
        <Hint pos='right' text="Настройки">
          <SettingsGearIcon64Regular aria-label='Настройки' className='settings' onKeyDown={(event) => {
            if (event.key === "Enter") {
              open();
            }
          }} onClick={open} />
      </Hint>
      {date && <Hint pos='left' text="Сбросить таймер">
            <TimeClockMoveBackIcon64Regular className='reset' aria-label='Сбросить таймер' onClick={() => {
              const date = new Date();

              setDate(date);
              setCurrentDate(`${getDate(date)}.${getMonth(date) + 1}.${getYear(date)}`);

              window.localStorage.setItem('currentDate', `${getDate(date)}.${getMonth(date) + 1}.${getYear(date)}`);
            }}  />
          </Hint>}
      </header>
      <main className='main'>
        <img className='main__clock' src={clockPath} alt='Часы' />
        <div className='main__content'>
          <p className='main__primaryText'>
            Работаем без потерь на производстве
          </p>
          <DateAfterLastLeave />
        </div>
      </main>
    </Center>
    </DateContext.Provider>
  )
}

export default App
