import { SettingsGearIcon64Regular } from '@skbkontur/icons/icons/SettingsGearIcon/SettingsGearIcon64Regular'
import { Button, Center, DatePicker, Gapped, Modal } from '@skbkontur/react-ui'

import clockPath from './assets/clock.svg';
import { DateAfterLastLeave } from './components/Date';
import React, { createContext, useState } from 'react';

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
      <SettingsGearIcon64Regular className='settings' onClick={open} />
      </header>
      <main className='main'>
        <img className='main__clock' src={clockPath} alt='Часы' />
        <div>
          <p className='main__primaryText'>
            Работаем без потерь на производстве
          </p>
          <DateAfterLastLeave />
        </div>
      </main>
      <footer className='footer'>
          {currentDate && <Button onClick={() => {
            setDate(null);
            setCurrentDate('');
          }} use='danger' size='large'>
            Сбросить таймер
          </Button>}
      </footer>
    </Center>
    </DateContext.Provider>
  )
}

export default App
