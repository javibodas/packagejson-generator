/* ENDPOINTS */

export const CREATE_FILE_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/files`
export const CREATE_USER_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
export const CREATE_USER_FILE_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/:userId/files`
export const DELETE_USER_FILE_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/:userId/files/:fileId`
export const GET_FILE_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/:fileId`
export const GET_USER_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/:userId`
export const GET_USER_FILES_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/:userId/files`
export const UPDATE_FILE_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/:fileId`