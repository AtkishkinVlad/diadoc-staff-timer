import { SettingsGearIcon64Regular } from '@skbkontur/icons/icons/SettingsGearIcon/SettingsGearIcon64Regular'
import { Button, Center, DatePicker, Gapped, Hint, Modal } from '@skbkontur/react-ui'

import clockPath from './assets/clock.svg';
import { DateAfterLastLeave } from './components/Date';
import React, { createContext, useState } from 'react';
import { ArrowRoundTimeBackIcon64Regular } from '@skbkontur/icons/icons/ArrowRoundTimeBackIcon/ArrowRoundTimeBackIcon64Regular';

export const DateContext = createContext<null | Date>(null);

function App() {
  const [opened, setOpened] = React.useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState('');

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>
            <h2 className='modal__header'>
              Настройки таймера
            </h2>
        </Modal.Header>
        <Modal.Body>
          <p className='datapicker__helper'>День отсчета</p>
          <DatePicker size='large' value={currentDate} onValueChange={(event) => {
            const [day, month, year] = event.split('.');
            setCurrentDate(event);
            setDate(new Date(+year, +month - 1, +day));
          }} />
        </Modal.Body>
        <Modal.Footer>
          <Gapped gap={16}>
            <Button size='large' use='primary' onClick={close}>Запустить таймер</Button>
            <Button size='large' use='danger' onClick={() => {
              close();
              setDate(null);
              setCurrentDate('');
            }}>Сбросить таймер</Button>
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
      <h1 className='header__appName'>
        Остаться в живых
      </h1>
      <Hint pos='left' text="Настройки">
        <SettingsGearIcon64Regular className='settings' onKeyDown={(event) => {
          if (event.key === "Enter") {
            open();
          }
        }} onClick={open} />
      </Hint>
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
      <footer className='footer'>
          {date && <Hint pos='left' text="Сбросить таймер">
            <Button icon={<ArrowRoundTimeBackIcon64Regular />} onClick={() => {
              setDate(new Date());
              setCurrentDate('');
            }} use='danger' size='large' />
          </Hint>}
      </footer>
    </Center>
    </DateContext.Provider>
  )
}

export default App
