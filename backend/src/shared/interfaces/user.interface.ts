export interface User {
  id?: number; // ID пользователя в базе данных (необязательное поле)
  telegramId: number;
  firstName: string;
  lastName?: string | null;
  username?: string | null;
  languageCode?: string | null;
  allowsWriteToPm?: boolean;
  photoUrl?: string | null;
}
