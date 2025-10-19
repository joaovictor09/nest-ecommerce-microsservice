import { Encrypter } from '@/application/criptography/encrypter';
import dayjs from 'dayjs';

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    // Se já tiver exp no payload, usa ele. Senão, define um para daqui 1h.
    const completePayload = {
      ...payload,
      exp: payload.exp ?? dayjs().add(7, 'days').unix(),
    };

    return JSON.stringify(completePayload);
  }
}
