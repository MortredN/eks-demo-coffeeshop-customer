import jwt from 'jsonwebtoken'

export const generateAccessToken = ({ email }) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('Cannot create token')
  }
  return jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' })
}

export const generateRefreshToken = ({ email }) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('Cannot create token')
  }
  return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1y' })
}

export const verifyRefreshToken = async (refreshToken) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('Cannot create token')
  }
  if (!refreshToken) {
    throw new Error('No refresh token')
  }
  const { email } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  return email
}
