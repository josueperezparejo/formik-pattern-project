import { enUS } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import { formatInTimeZone } from "date-fns-tz";

export class DateTimeFormatter {
  /**
   * Valida si una fecha es válida
   * @param date - Fecha a validar (string o Date)
   * @returns true si la fecha es válida, false en caso contrario
   */
  private static isValidDate(date: string | Date): boolean {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj instanceof Date && !isNaN(dateObj.getTime());
    } catch {
      return false;
    }
  }

  /**
   * Convierte una fecha local (ej: 2025-07-20T19:00:00) a UTC para guardar en backend
   * @param localDateTime - Fecha y hora local como string ("yyyy-MM-ddTHH:mm:ss")
   * @param timeZone - Zona horaria opcional, por defecto la del navegador
   * @returns Fecha en UTC como string ISO o null si la fecha es inválida
   */
  public static formatDateToUtC(
    localDateTime: string,
    timeZone?: string,
  ): string | null {
    try {
      if (!this.isValidDate(localDateTime)) {
        return null;
      }

      const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

      const utcDate = toZonedTime(localDateTime, tz);
      return utcDate.toISOString();
    } catch (error) {
      return null;
    }
  }

  /**
   * Formatea una fecha UTC para mostrar en la zona horaria del usuario
   * @param dateUTC - Fecha en UTC (string ISO o Date)
   * @param format - Formato opcional, por defecto: "dd MMMM yyyy HH:mm"
   * @param timeZone - Zona horaria opcional, por defecto la del navegador
   * @returns Fecha formateada en zona local del usuario o string vacío si la fecha es inválida
   */
  public static formatDateToLocal(
    dateUTC: string | Date,
    format = "dd MMMM yyyy HH:mm",
    timeZone?: string,
  ): string {
    try {
      if (!this.isValidDate(dateUTC)) {
        return "";
      }

      const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      return formatInTimeZone(dateUTC, tz, format, {
        locale: enUS,
      });
    } catch (error) {
      return "";
    }
  }

  /**
   * Formatea una fecha UTC para mostrar solo la parte de fecha (sin hora)
   * @param utcDate - Fecha en UTC
   * @param timeZone - Zona horaria opcional, por defecto la del navegador
   * @returns Fecha en formato: "yyyy-MM-dd" o string vacío si la fecha es inválida
   */
  public static formatDateOnly(
    utcDate: string | Date,
    timeZone?: string,
  ): string {
    try {
      if (!this.isValidDate(utcDate)) {
        return "";
      }

      const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      return formatInTimeZone(utcDate, tz, "yyyy-MM-dd", {
        locale: enUS,
      });
    } catch (error) {
      return "";
    }
  }

  /**
   * Obtiene la zona horaria actual del navegador de forma segura
   * @returns Zona horaria o 'UTC' como fallback
   */
  public static getCurrentTimeZone(): string {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      return "UTC";
    }
  }

  /**
   * Valida y parsea una fecha de forma segura
   * @param dateInput - Fecha como string o Date
   * @returns Date válido o null si es inválido
   */
  public static parseDate(dateInput: string | Date): Date | null {
    try {
      if (!this.isValidDate(dateInput)) {
        return null;
      }
      return typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    } catch (error) {
      return null;
    }
  }
}
