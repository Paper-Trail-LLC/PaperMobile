// Use this import if you want to use "env.js" file
const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = "http://example.com"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "http://192.168.0.24:8081",
  timeout: 10000,
}
