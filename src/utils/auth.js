import jwt from 'jsonwebtoken'

export const generateAccessToken = (customer) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('Cannot create token')
  }
  return jwt.sign(
    {
      id: customer.id,
      email: customer.email,
      name: customer.name
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1y' }
  )
}

export const generateRefreshToken = (customer) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('Cannot create token')
  }
  return jwt.sign(
    {
      id: customer.id,
      email: customer.email,
      name: customer.name
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '1y' }
  )
}

export const verifyRefreshToken = async (refreshToken) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('Cannot create token')
  }
  if (!refreshToken) {
    throw new Error('No refresh token')
  }
  const customer = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  return customer
}
