export const getUserData = () => {
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    const initData = tg.initData;

    if (initData) {
      return initData || null;
    }
  }

  console.error("Telegram WebApp SDK не доступен");
  return null;
};

export const getInitDataUnsafe = () => {
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    const initDataUnsafe = tg.initDataUnsafe;

    if (initDataUnsafe) {
      return initDataUnsafe || null;
    }
  }

  console.error("Telegram WebApp SDK не доступен");
  return null;
};
