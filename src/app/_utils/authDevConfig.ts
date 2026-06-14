export const authCookieName = 'monthly_collection_session'
export const verifiedPhoneStorageKey = 'monthly_collection_verified_phone'

export const devAuth = {
  phone: '77 123 4567',
  password: 'password123',
  otp: '123456'
}

export const normalizeDigits = (value: string) => value.replace(/\D/g, '')

export const saveDevAuthSession = () => {
  document.cookie = `${authCookieName}=dev-session; path=/; max-age=86400; samesite=lax`
}
