import { SettingsGearIcon16Regular } from '@skbkontur/icons/icons/SettingsGearIcon/SettingsGearIcon16Regular'
import { Button, Center, DatePicker, Gapped, Modal } from '@skbkontur/react-ui'

import clockPath from './assets/clock.svg';
import { DateAfterLastLeave } from './components/Date';
import React from 'react';

function App() {
  const [opened, setOpened] = React.useState(false);

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
          <DatePicker size='large' onValueChange={(event) => console.log(event)} />
        </Modal.Body>
        <Modal.Footer>
          <Gapped gap={16}>
            <Button size='large' use='primary' onClick={close}>Запустить таймер</Button>
            <Button size='large' use='danger' onClick={close}>Сбросить таймер</Button>
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
    <Center>
      {opened && renderModal()}
      <header className='header'>
      <h1 className='header__appName'>
        Остаться в живых
      </h1>
      <Button onClick={open} className='' borderless icon={<SettingsGearIcon16Regular />} size='large' use='primary'>
        Настройки  
      </Button>
      </header>
      <main className='main'>
        <img className='main__clock' src={clockPath} alt='Часы' />
        <div>
          <p className='main__primaryText'>
            Работаем без потерь на производстве
          </p>
          <DateAfterLastLeave lastLeaveDate={new Date()} />
        </div>
      </main>
    </Center>
  )
}

export default App
