import { Injectable, ForbiddenException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TelegramService {
  // Токен бота Telegram (секретный ключ для проверки хэша)
  private readonly botToken = '5821534037:AAGGxevje9-Qlf4PSh6TeIjPWFiEWzrrXC0';

  /**
   * Проверяет наличие обязательных параметров в запросе.
   * @param query - Объект запроса с параметрами.
   * @throws ForbiddenException - Если отсутствуют обязательные параметры.
   */
  validateQueryParams(query: any) {
    if (!query.hash || !query.auth_date) {
      throw new ForbiddenException(
        'Access Denied: Missing required parameters',
      );
    }
  }

  /**
   * Проверяет корректность хэша запроса.
   * Хэш вычисляется на основе данных и секретного ключа бота.
   * @param query - Объект запроса с параметрами.
   * @throws ForbiddenException - Если хэш неверный.
   */
  validateHash(query: any) {
    const dataCheckString = Object.keys(query)
      .filter((key) => key !== 'hash') // Исключаем поле hash из строки
      .sort() // Сортируем ключи по алфавиту
      .map((key) => `${key}=${query[key]}`) // Формируем пары ключ=значение
      .join('\n'); // Объединяем в строку через символ новой строки

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData') // Используем WebAppData как соль
      .update(this.botToken) // Добавляем токен бота
      .digest(); // Получаем бинарное представление ключа

    const computedHash = crypto
      .createHmac('sha256', secretKey) // Используем секретный ключ
      .update(dataCheckString) // Добавляем строку данных
      .digest('hex'); // Получаем хэш в шестнадцатеричном формате

    if (computedHash !== query.hash) {
      throw new ForbiddenException('Access Denied: Invalid hash');
    }
  }

  /**
   * Проверяет срок действия данных запроса.
   * Telegram-данные действительны только в течение 24 часов.
   * @param authDate - Время создания данных в формате Unix timestamp.
   * @throws ForbiddenException - Если данные устарели.
   */
  validateAuthDate(authDate: string) {
    const now = Math.floor(Date.now() / 1000); // Текущее время в секундах
    const authDateInt = parseInt(authDate, 10); // Преобразуем auth_date в число

    if (now - authDateInt > 86400) {
      throw new ForbiddenException('Access Denied: Request expired');
    }
  }

  /**
   * Парсит данные пользователя из JSON-строки.
   * @param user - JSON-строка с данными пользователя.
   * @returns - Объект с данными пользователя.
   * @throws ForbiddenException - Если данные пользователя некорректны.
   */
  parseUserData(user: string) {
    try {
      const parsedUser = JSON.parse(user); // Преобразуем JSON-строку в объект
      if (!parsedUser?.first_name) {
        throw new ForbiddenException('Access Denied: Invalid user data');
      }
      return parsedUser; // Возвращаем распарсенные данные
    } catch {
      throw new ForbiddenException('Access Denied: Invalid user data');
    }
  }
}
